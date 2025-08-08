import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');

  const loginData = {
    email: email,
    password: password
  };

  async function login() {
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok) {
        useNavigate('/vault');
      } else {
        setOutput(data.message || 'Login failed, try again');
      }
    } catch (error) {
      console.error('Error:', error);
      setOutput('Login Error');
    }
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

      <button onClick={login}>Login</button>
      <button onClick={sayHello}>Hello World</button>

      <p>{output}</p>
      <p>{"Don't have an account?"} <Link to="/register">Register</Link></p>
    </div>
  );
}

export default LoginPage;
