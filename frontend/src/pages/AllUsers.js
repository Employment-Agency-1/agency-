
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../css modules/AllUsers.module.css'; 

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);
// get all users to it can be displayed for the admin
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('/api/all-users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link to="/admin" className={styles.navLink}>Back to the Admin Dashboard</Link>
      </nav>
      <h2 className={styles.heading}>All Registered Users 📈</h2>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Username ✍</th>
            <th className={styles.tableHeader}>Email 📨</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email} className={styles.userRow}>
              <td className={styles.userData}>{user.username}</td>
              <td className={styles.userData}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
