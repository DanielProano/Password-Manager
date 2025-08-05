const crypto = require('crypto');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());

const algo = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = cryto.randomBytes(16);

app.listen(process.env.PORT, (error) => {
	if (!error) {
		console.log(`Server is Running on port ${process.env.PORT}`);
	} else {
		console.log("Error, server is not running", error);
	}
});

const db = new sqlite3.Database('./passwords.db', (err) => {
	if (err) {
		return console.error('Database connection error', err.message);
	}
	console.log('Connected to Database')
});

app.get('/api/hello', (req, res) => {
	res.send("Hello World");
});

db.run(`
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT UNIQUE NOT NULL,
		password TEXT NOT NULL
	)`, err => {
		if (err) console.error('Users table access failure:', err);
		else console.log('Users table access successful')
});

app.post('/api/register', async (req, res) => {
	const { user, pass } = req.body

	const saltRounds = 10

	try {
		const salt = await bcrypt.genSalt(saltRounds)
		const hash = await bcrypt.hash(pass, salt);
		
		db.run(
			`INSERT INTO users(username, password) VALUES(?, ?)`, 
			[user, hash],
			(err) => {
				if (err) {
					console.log('DB Insert Error', err.message);
					return res.status(500).json({error: 'DB Error'});
				}
			res.status(201).json({ message: 'User registered successfully' });
			}
		);
	} catch (err) {
		console.log("General problem with /api/register", err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

app.post('/api/verify', async (req, res) => {
	const { user, pass } = req.body

	try {
		const row = await new Promise((resolve, reject) => {
			db.get('SELECT id, password FROM users WHERE username = ?', [user], (err, row) => {
				if (err) reject(err);
				else resolve(row);
			});
		});

		if (!row) {
			return res.status(401).json({ error: 'User not found'});
		}

		const isValid = await bcrypt.compare(pass, row.password);

		if (isValid) {
			console.log('Correct Password, user authenticated.');

			const token = jwt.sign(
				{ username: user, user_id: row.id },
				process.env.JWT_SECRET,
				{ expiresIn: '1h' }
			);
				
			res.status(200).json({
				message: 'Authentication successful',
				token: token
			});

		} else {
			console.log('Wrong Password, authentication failed.');
			res.status(401).json({ error: 'Invalid password' });
		}
	} catch (err) {
		console.error('Error occured:', err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

db.run(
	`CREATE TABLE IF NOT EXISTS vault (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		service TEXT NOT NULL,
		login TEXT NOT NULL,
		password TEXT NOT NULL,
		notes TEXT NOT NULL,
		FOREIGN KEY(user_id) REFERENCES users(id)
	)`, err => {
		if (err) console.log("Vault table access failure:", err)
		else console.log("Vault table access Success")
});

function validateToken(req, res, next) {
	const header = req.headers['authorization'];
	const token = header && header.split(' ')[1];
	const key = process.env.JWT_SECRET;

	try {
		const verified = jwt.verify(token, key);
		req.user = verified;
		next();
	} catch (error) {
		return res.status(403).json({error: 'Invalid token'});
	}
}

app.post('/api/vault', validateToken, (req, res) => {
	const { service, login, password, notes } = req.body;
	const userID = req.user.user_id;

	if (!service || !login || !password) {
		return res.status(400).json({ error: 'Missing fields' });
	}

	db.run(
		`INSERT INTO vault (user_id, service, login, password, notes) VALUES (?, ?, ?, ?, ?)`,
		[userID, service, login, password, notes],
		function(err) {
			if (err) {
				console.error('Vault insert error:', err.message);
				return res.status(500).json({ error: 'Problem saving password' });
			}
			
			res.status(201).json({ message: 'Inserted Password successfully' });
		}
	);
});	

app.patch('/api/vault/:id', validateToken, (req, res) => {
	const fields = ['service', 'login', 'password', 'notes'];

	let updates = [];
	let values = [];

	for (const field of fields) {
		if (req.body[field] !== undefined) {
			updates.push(`${field} = ?`);
			values.push(req.body[field]);
		}
	}

	if (updates.length === 0) {
		return res.status(400).json({ error: 'No updates provided' });
	}

	values.push(req.user.user_id, req.params.id);

	const sql = `UPDATE vault SET ${updates.join(',')} WHERE user_id = ? AND id = ?`;

	db.run(sql, values, function(err) {
		if (err) {
			console.error('Vault error:', err.message);
			return res.status(500).json({ error: 'Database internal error' });
		}

		if (this.changes === 0) {
			return res.status(404).json({ error: 'Vault error'});
		}

		return res.status(200).json({ message: 'Update Successful' });
	});
});
		
