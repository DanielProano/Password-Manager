import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { use_auth } from '../Contexts/AuthContext';
import { derive_key } from '../Contexts/Encrypt';
import bcrypt from 'bcryptjs';

import './Login.css';

function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [output, setOutput] = useState('');

	const navigation = useNavigate();
	const { derived_key, set_derived_key } = use_auth();

	async function login() {
		try {
			const salt_response = await fetch(`/api/salt?user=${encodeURIComponent(email)}`);

			const { master_salt } = await salt_response.json();

			const hash = await bcrypt.hashSync(password, master_salt);

			const response = await fetch('/api/verify', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ user: email, hash: hash })
			});

			const data = await response.json();

			if (response.ok) {
				const { token, salt } = data;

				const key = await derive_key(password, salt);

				set_derived_key({ key: key, token: token });
	
				navigation('/vault');
			} else {
				setOutput(data.message || 'Login failed, try again');
			}
		} catch (error) {
			console.error('Error:', error);
			setOutput('Login Error');
		}
	}

	return (
	  <div>
	    <div className="Login">
	      <h1>A Password Manager</h1>
            </div>
            <div className="Login">
              <div id="Login-Sub">
              <h2>Keeping your passwords secure</h2>
            </div>
          </div>

          <div className="Login-Container">
            <div id="Login-Box">
              <div className="Login-Input">
                <input
                  type='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                /><br /><br />
              </div>

              <div className="Login-Input">
                <input
                  type='password'
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                /><br /><br />
              </div>
              <div id="Login-Button">
                <button onClick={login}>Login</button>
              </div>
            </div>
          </div>

          <div id="output"><p>{output}</p></div>
          <div className="Login">
            <p>{"Don't have an account?"} <Link to="/register">Register</Link></p>
          </div>
        </div>
      );
}

export default LoginPage;
