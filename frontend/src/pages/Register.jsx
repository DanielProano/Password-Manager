import { userState } from 'react';
import { Link, userNavigate } from 'react-router-dom';

function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = userState('');

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
		</div>
	);

	async function Register() {
		try {
			
	
	return html;
};

export default Register;
