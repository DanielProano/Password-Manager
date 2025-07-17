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

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
	<h1> Password Manager </h1>
	<h2> Keeping your passwords secure </h2>
	<input type="text" id="Email" placeholder="Enter your email"><br><br>
	<input type="password" id="Password" placeholder="Enter your password"><br>
        <button onclick="login()">Save</button>

	<script>
		function login() {
			const user = document.getElementById('Email').value;
			const pass = document.getElementById('Password').value;
			console.log('Email:', user);
			console.log('Password:', pass);
		}
	</script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
    console.log('Server listening on port ${PORT}');
});
