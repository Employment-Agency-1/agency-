import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import styles from '../css modules/UserPage.module.css';

function UserPage() {
  const [role, setRole] = useState('user');  // A state to store user role

  useEffect(() => {
    fetchUserInfo();  // fetch user information including their role
  }, []);

  const fetchUserInfo = () => {
    const token = localStorage.getItem('token');  // Retrieve token from localStorage
    if (token) {
      const decodedToken = jwtDecode(token); //decode JWT token before passing it to a state
      setRole(decodedToken.role);  // now we can set user role based on decoded token
    }
  };

  const handleAdminClick = (e) => {
    if (role === 'admin') {
      e.preventDefault();  //since we don't let admin in, we prevent navigation for admins
      alert('You are an Admin, you cannot create a user profile!');
    }
    // no need for else statement as default behavior allows navigation for users
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li>
            <Link to="/company" className={styles.navLink}>Company Page</Link>
          </li>
          <li>
            <Link to="/profile" className={styles.navLink}>Profile Page</Link>
          </li>
          {/* below the rendering of Add Profile link is based on user role , only a user can See the Link */}
          {role !== 'admin' && (
            <li>
              <Link to="/add-profile" className={styles.navLink} onClick={handleAdminClick}>Add Profile</Link>
            </li>
          )}
        </ul>
      </nav>
      <div className={styles.content}>
        <h2 className={styles.heading}>Welcome to the User Dashboard 👋</h2>
        <img className={styles.welcomeImage} src="https://media1.tenor.com/m/qEV9igsXP4YAAAAC/welcome.gif" alt="Welcome GIF" />
        <p className={styles.description}>
          Greetings future employee! We're here to help you land your dream job.<br/><br/>
          First to get started, click on <strong>Add Profile</strong> to add a new Profile!
        </p>
      </div>
    </div>
  );
}

export default UserPage;
