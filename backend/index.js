honst express = require('express');
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

app.post('/', (req, res) => {
	const {name} = req.body;
	res.send(`Welcome ${name}`);
});

db.run(`
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT UNQIUE NOT NULL,
		password TEXT NOT NULL
	)
`);



