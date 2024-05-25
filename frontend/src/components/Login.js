import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import styles from '../css modules/Login.module.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
// condiditon to check if the user inputs both (pass & username) are empty or not
  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please fill in all fields.');
      return;
    }
    //if they are both inputed we do a post req to '/api/login' below
    try {
      const response = await axios.post('/api/login', { username, password }); //we pass username & pw
      
const token = response.data.token; // we extract the still "CODED token"  from res.data
 localStorage.setItem('token', token); // Store token in localStorage SINCE the command localStorage.setItem('key', 'value') is a method used to store data in localStorage Used for preserving user authentication status between visits to a website
    //locastorage can be vulnerable to cross-site scripting (XSS) attacks so it's not the most secure method
      
    const decodedToken = jwtDecode(token);  //// Decode the token to access it useing jwtDecode
      if (decodedToken.role === 'admin') { // now we check the role in the decoded token
        navigate('/admin'); // if role admin navigate to page admin
      } else {
        navigate('/user'); //else navigate to page user 
      }
    } catch (error) { //handle error
      alert('Login failed!');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.inputContainer}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
      </div>
      <button onClick={handleLogin} className={styles.button}>Login</button>
      <p className={styles.link}>
        You don't have an account? <Link to="/signup">Sign up!</Link>
      </p>
    </div>
  );
}

export default Login;
