import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('/api/companies');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/user">Back to User Page</Link> 
          </li>
          <li>
            <Link to="/admin">Admin Page</Link> 
          </li>
        </ul>
      </nav>
      <h2>Welcome to the Company Page!</h2>
      <h3>Companies</h3>
      <ul>
        {companies.map(company => (
          <li key={company.id}>
            {company.name} - {company.description} - ${company.netSalary}
            <button>Apply Now!</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyPage;
