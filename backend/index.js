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
		if (err) console.error('Table Error', err);
		else console.log('Table access successful')
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

