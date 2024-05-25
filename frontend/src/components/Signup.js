import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../css modules/Signup.module.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();
 // check if all inputs are filled or not 
  const handleSignup = async () => {
    if (!username || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      // the condition to check if the email already exists or not
      const emailCheckResponse = await axios.get('/api/check-email', { params: { email } }); // refer to checkEmailExists function 
      if (emailCheckResponse.data.exists)  { // this returns true or false in the 'exists' key  user in const checkEmailExists in the backend
        alert('The email already exists');
        return; // to prevent any other code execution in the function from running, so that no additional actions are taken if the email already exists.
      }

      // else proceed as normal with signup if email does not exist
      await axios.post('/api/signup', { username, email, password, role }); // passing username , email pw & role in the signup
      alert('Signup successful!');
      navigate('/login');
    } catch (error) {
      alert('Signup failed!');
    }
  };

  return (
    <div className={styles.Signupcontainer}>
      <h2 className={styles.title}>Signup</h2>
      <div className={styles.inputSignupcontainer}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.inputSignupcontainer}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.inputSignupcontainer}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.selectSignupcontainer}>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button className={styles.button} onClick={handleSignup}>Signup</button>
      <p className={styles.link}>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Signup;
