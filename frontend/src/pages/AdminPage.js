import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../css modules/AdminPage.module.css';

const AdminPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [netSalary, setNetSalary] = useState('');
  const [companies, setCompanies] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [editingCompany, setEditingCompany] = useState(null); // CR state to handle both edit or add company 
//this useEffect contains two functions to avoid repitition and because it's best practice 
  useEffect(() => {
    fetchCompanies();
    fetchUserCounts();
  }, []);
//fetch comapnies and set its state
  const fetchCompanies = async () => {
    try {
      const response = await axios.get('/api/companies');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };
//fetch users
  const fetchUserCounts = async () => {
    try {
      const token = localStorage.getItem('token'); //retrieve the JWT token stored in the browser's localStorage
      // const response = await axios.get(`/api/users?token=${token}`); less secure as URLs can be logged, stored in browser history ,the token can be intercepted 
      const response = await axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${token}`, //by using the Bearer scheme, the token is sent securely in the header rather than in the URL or body
        },
      });
      setUserCount(response.data.userCount); // upadate the state with the count after getting the userCount
    } catch (error) {
      console.error('Failed to fetch user counts:', error);
    }
  };

  const handleAddCompany = async () => {
    try {
      await axios.post('/api/companies', { name, description, netSalary });
      alert('Company added successfully!');
      fetchCompanies(); // using fetchCompanies to refresh the contents of our page
      setName(''); // Clear input fields
      setDescription('');
      setNetSalary('');
    } catch (error) {
      console.error('Error adding company:', error);
      alert('Failed to add company!');
    }
  };

  const handleDeleteCompany = (id) => {
    axios.delete(`/api/companies/${id}`)
      .then(() => {
        console.log("Company deleted");
        fetchCompanies();
      })
      .catch((err) => {
        console.error('Error deleting company:', err);
      });
  };
// edit a comapny by showing its inforamtion by setting their states 
  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setName(company.name);
    setDescription(company.description);
    setNetSalary(company.netSalary);
  };

  const handleUpdateCompany = () => {
    axios.put(`/api/companies/${editingCompany.id}`, { name, description, netSalary })
      .then(() => {
        console.log("Company updated");
        fetchCompanies();
        setEditingCompany(null); // reset our state to null after editing state
        setName(''); 
        setDescription(''); 
        setNetSalary(''); 
      })
      .catch((err) => {
        console.error('Error updating company:', err);
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Welcome to the Admin Dashboard 💻</h2>
      <nav>
        <ul>
          <li>
            <Link to="/company" className={styles.navLink}><strong>Company Page 🏢</strong></Link>
          </li>
          <li>
            <Link to="/allusers" className={styles.navLink}><strong>All Users🕵</strong></Link>
          </li>
          <li>
            <Link to="/applylist" className={styles.navLink}><strong>Apply List 📬</strong></Link>
          </li>
        </ul>
      </nav>

      <p className={styles.subheading}>Total Number of Users with Role 'User': {userCount}</p>
      <h3 className={styles.subheading}>Add New Company</h3>
      <input
        type="text"
        className={styles.inputField}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className={styles.inputField}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        className={styles.inputField}
        placeholder="Net Salary"
        value={netSalary}
        onChange={(e) => setNetSalary(e.target.value)}
      />
      {editingCompany ? (
    <button className={styles.button} onClick={handleUpdateCompany}>Update Company</button>
        ) : (
    <button className={styles.button} onClick={handleAddCompany}>Add Company</button>
      )}
 <h3 className={styles.subheading}>Companies</h3>
      <ul className={styles.companyList}>
        {companies.map(company => (
          <li key={company.id} className={styles.companyItem}>
            <span className={styles.companyName}>🏢 {company.name}</span> 
            <span className={styles.companyDescription}><b>📝 {company.description}</b></span>  
            <span className={styles.companyNetSalary}><b> {company.netSalary}💲</b></span>
            <button className={styles.deleteButton} onClick={() => handleDeleteCompany(company.id)}>Delete</button>
            <button className={styles.editButton} onClick={() => handleEditCompany(company)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
