# Password Manager

A password manager web application that contains all the modern

security features a good zero-knowledge password manager should have.

## Features

- Zero Knowledge Implementation

- Secure user registration and login

- Master password salting and hashing with bcrypt

- Client side data encryption using a master password token and salt

- JSON Web Token generation and persistent session with JWT-based authentication

- Ability to add, delete, and view vault info

- Rate Limiting

- Strong master passwords enforced

- Automatic vault lock after inactivity

## Tech Stack

### Docker

- For containerizing and isolating the app

### Nginx 

- Acts as a reverse proxy

### Backend:

- **express.js** - Web Framework

- **express-rate-limit** - Library for rate limiting

- **jsonwebtoken** - Library for JWT generation and verification

- **sqlite3** - Database

- **dotenv** - Library to load variables from .env

- **crypto** - Library used to create secure and random salts

### Frontend:

- **vite** - Frontend build tool

- **react-router-dom** - React library facilitating the interaction between

- **bcryptjs** - Javascript library for hashing and salting

different pages

## Security Model

Upon registration, with strong password generation enforced, the master password is
