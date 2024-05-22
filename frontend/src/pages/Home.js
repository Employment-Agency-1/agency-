
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Welcome To The Employment Agency</h2>
      <p>
        <Link to="/signup">Proceed to the Sign Up page to get started</Link>
      </p>
    </div>
  );
};

export default Home;
