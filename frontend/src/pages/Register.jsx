import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Register.css';

function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [output, setOutput] = useState('');
	const [passWarn, setPassWarn] = useState('');

	const navigate = useNavigate();

	function validatePassword(pass) {
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
		return regex.test(pass);
	}

	function handlePassChange(e) {
		const value = e.target.value;
		setPassword(value);

		if (!validatePassword(value)) {
			setPassWarn('Password requires 8 characters with a special, capital, lowercase, and number');
		} else {
			setPassWarn('');
		}
	}

	async function register_login() {
		const newLogin = {
			user: email,
			pass: password
		};

		try {
			const response = await fetch('/api/register', {
        			method: 'POST',
        			headers: { 'Content-Type': 'application/json' },
        			body: JSON.stringify(newLogin)
      			});

      			const data = await response.json();

      			if (response.ok) {
        			navigate('/RegisterSuccess');
      			} else {
				setOutput('Couldnt Register');
			}
    		} catch (error) {
      			console.error('Error:', error);
      			setOutput('Login Error');
    		}
	}	


	const html = (
		<div id='Register'>
			<h1>Register for Password Manager</h1>
			
			<div id='Email-Box'>
				<input
        				type='email'
        				placeholder='Register a New User'
        				value={email}
        				onChange={(e) => setEmail(e.target.value)}
      				/><br /><br />
			</div>
			
			<div id='Password-Box'>
				<input
					type='password'
					placeholder='Register a New Password'
					value={password}
					onChange={handlePassChange}
				/><br /><br />
			</div>	

			<div id="Warning">
			  {passWarn && <div className="error">{passWarn}</div>}
			</div>
			
			<button  onClick={register_login} disabled={!email || !password}>Register</button>
			<p>{output}</p>	
		</div>
	);

	return html;
};

export default Register;
