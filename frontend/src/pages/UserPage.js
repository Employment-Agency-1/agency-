
import React from 'react';
import { Link } from 'react-router-dom'; 

function UserPage() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/company">Company Page</Link> 
          </li>
          <li>
            <Link to="/profile">Profile Page</Link>
          </li>
          <li>
            <Link to="/add-profile">Add Profile</Link> 
          </li>
        </ul>
      </nav>
      <h2>Welcome to the User Page!</h2>
    </div>
  );
}

export default UserPage;
