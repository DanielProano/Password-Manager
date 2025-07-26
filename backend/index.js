const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./passwords.db', (err) => {
	if (err) {
		return console.error('Database connection error', err.message);
	}
	console.log('Connected to Database')
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
