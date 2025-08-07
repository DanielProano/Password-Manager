import { useState } from 'react'
import { Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');

  function login() {
    console.log('Email:', email);
    console.log('Password:', password);
  }

  async function sayHello() {
    try {
      const response = await fetch('/api/hello');
      const text = await response.text();
      setOutput(text);
    } catch (error) {
      console.error('Error fetching hello:', error);
      setOutput('Error calling backend');
    }
  }

  return (
    <div>
      <h1>Password Manager by Danny Proano</h1>
      <h2>Keeping your passwords secure</h2>

      <input
        type='email'
        placeholder='Enter your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        type='password'
        placeholder='Enter your password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={login}>Save</button>
      <button onClick={sayHello}>Hello World</button>

      <p>{output}</p>
      <p>{"Don't have an account?"} <Link to="/register">Register</Link></p>
    </div>
  );
}

export default LoginPage;
