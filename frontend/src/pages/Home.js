import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css modules/Home.module.css'; 
import logo from '../css modules/EGlogo.png'

const Home = () => {
  return (
    <div className={styles.sbody}>
    <div className={styles.homeContainer}>
    <img src={logo} alt="Employment Agency Logo" className={styles.logo} />
      <h2 className={styles.title}>Get Hired ! </h2>
      <p className={styles.subtitle}>This is your gateway to finding the perfect job opportunity</p>
      <p className={styles.text}>Join our platform to explore thousands of job listings and connect with employers.</p>
      <p className={styles.text2}>Whether you're a job seeker or an employer, we've got you covered!</p>
      <Link to="/signup" className={styles.link}>Get Started</Link>
    </div>
    </div>    
  );
};

export default Home;
