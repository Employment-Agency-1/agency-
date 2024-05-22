import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [netSalary, setNetSalary] = useState('');
  const [companies, setCompanies] = useState([]);
  const [userCount, setUserCount] = useState(0); // New state for user count

  useEffect(() => {
    fetchCompanies();
    fetchUserCounts(); // Fetch user counts on component mount
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('/api/companies');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const fetchUserCounts = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in headers
        },
      });
      setUserCount(response.data.userCount);
    } catch (error) {
      console.error('Failed to fetch user counts:', error);
    }
  };

  const handleAddCompany = async () => {
    try {
      await axios.post('/api/companies', { name, description, netSalary });
      alert('Company added successfully!');
      fetchCompanies(); // Refresh the list of companies after adding so i dont have to
    } catch (error) {
      console.error('Error adding company:', error);
      alert('Failed to add company!');
    }
  };

  const handleDeleteCompany = async (companyId) => {
    try {
      await axios.delete(`/api/companies/${companyId}`);
      alert('Company deleted successfully!');
      fetchCompanies(); // Refresh the list of companies after deletion cos lazy to press F5
    } catch (error) {
      console.error('Error deleting company:', error);
      alert('Failed to delete company!');
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/company">Company Page</Link>
          </li>
          <li>
            <Link to="/allusers">All Users</Link>
          </li>
          <li>
            <Link to="/applylist">Apply List</Link> 
          </li>
        </ul>
      </nav>
      <h2>Welcome to the Admin Page!</h2>
      <p>Total Number of Users with Role 'User': {userCount}</p>
      <h3>Add New Company</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Net Salary"
        value={netSalary}
        onChange={(e) => setNetSalary(e.target.value)}
      />
      <button onClick={handleAddCompany}>Add Company</button>

      <h3>Companies</h3>
      <ul>
        {companies.map(company => (
          <li key={company.id}>
            {company.name} - {company.description} - ${company.netSalary}
            <button onClick={() => handleDeleteCompany(company.id)}> Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
