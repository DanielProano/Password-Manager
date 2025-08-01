const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.listen(PORT, (error) => {
	if (!error) {
		console.log(`Server is Running on port ${PORT}`);
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

db.run(`
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT UNIQUE NOT NULL,
		password TEXT NOT NULL
	)`, err => {
		if (err) console.error('Users table access failure:', err);
		else console.log('Users table access successful')
});

app.get('/api/hello', (req, res) => {
	res.send('Hello World');
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
			db.get('SELECT password FROM users WHERE username = ?', [user], (err, row) => {
				if (err) reject(err);
				else resolve(row);
			});
		});

		if (!row) {
			return res.status(401).json({ error: 'User not found'});
		}

		const isValid = bcrypt.compare(pass, row.password);

		if (isValid) {
			console.log('Correct Password, user authenticated.');
			res.status(200).json({ message: 'Authentication succssful' });
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
		password TEXT NOT NULL,
		FOREIGHN KEY(user_id) REFERENCES users(id)
	)`, err => {
		if (err) console.log("Vault table access failure:", err)
		else console.log("Vault table access Success")
});


		
