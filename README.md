# Password Manager

A password manager web application that contains all the modern

security features a good password app should have, including:

- Zero Knowledge Implementation

- Master password hashing and securely stored

- Client side data encryption with master password

- JSON Web Token generation and verification

- Ability to change and view vault info

- Rate Limiting

- Strong master passwords enforced

## Tech Stack

### Docker

- For containerizing the app

### Nginx 

- Acts as a reverse proxy

### Backend:

- **express.js** - Web Framework

- **express-rate-limit** - Library for rate limiting

- **jsonwebtoken** - Library for JWT generation and verification

- **bcrypt** - Library for master password hashing

- **sqlite3** - Database

- **dotenv** - Library to load variables from .env

- **crypto** - Library used to create secure and random salts

### Frontend:

- **vite** - Frontend build tool
