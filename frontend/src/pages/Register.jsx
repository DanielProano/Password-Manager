import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [output, setOutput] = useState('');

	const navigate = useNavigate();

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
			
			<div id='Email-Bow'>
				<input
        				type='email'
        				placeholder='Register a New Email'
        				value={email}
        				onChange={(e) => setEmail(e.target.value)}
      				/><br /><br />
			</div>
			
			<div id='Password-Box'>
				<input
					type='password'
					placeholder='Register a New Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/><br /><br />
			</div>	
			
			<button  onClick={register_login} disabled={!email || !password}>Register</button>
			<p>{output}</p>	
		</div>
	);

	return html;
};

export default Register;
