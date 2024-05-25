import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import styles from '../css modules/CompanyPage.module.css';

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user'); //initialized as user role for preference 

  useEffect(() => {
    fetchCompanies();
    fetchUserInfo();
  }, []);
// func to get all companies
  const fetchCompanies = async () => {
    try {
      const response = await axios.get('/api/companies');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };
//also fetch user info user name and role
  const fetchUserInfo = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.username);
      setRole(decodedToken.role);
    }
  };
//prevent admins from applying
  const handleApply = (companyName) => {
    if (role === 'admin') {
      alert("You can't apply, you're an admin!");
      return;
    }

    const appliedCompanies = JSON.parse(localStorage.getItem('appliedCompanies')) || []; //first we parse the string into an object of arrays
    //a variable that will take true if username applies to the same company
    const alreadyApplied = appliedCompanies.find(company => company.username === username && company.company === companyName);
//if true it means he already applied to the same company
    if (alreadyApplied) {
      alert('You already applied to this company!');
      return;
    }

    // else notify the user that their application was successful
    alert("Success, the Company's admin will receive your application!");

    // here we store the application data after success
    appliedCompanies.push({ username, company: companyName });
    localStorage.setItem('appliedCompanies', JSON.stringify(appliedCompanies)); //since it's parsed now we stringify it 
  };

  const handleAdminClick = (e) => { // if a user clicks prevent navigation to that specific link of Admin
    if (role !== 'admin') {
      e.preventDefault();
      alert('Access denied! You are not an Admin!');
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link to="/user" className={styles.navLink}>Go to User Page</Link>
        <Link to="/admin" className={styles.navLink} onClick={handleAdminClick}>Admin Page</Link>
      </nav>
      <h2 className={styles.title}>Check Our Exclusive Job Offers 📢 </h2>
      <h3 className={styles.subtitle}>   Cᴏᴍᴘᴀɴɪᴇs List 💼</h3>
      <ul className={styles.companyList}>
        {companies.map(company => (
          <li key={company.id} className={styles.companyItem}>
            <span className={styles.companyText}>Company Name : {company.name}</span> - 
            <span className={styles.companyText}>Field : {company.description}</span> - 
            <span className={styles.companyText}>Net Salary : ${company.netSalary}</span>
            <button className={styles.applyButton} onClick={() => handleApply(company.name)}>Apply Now! 📩</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyPage;
