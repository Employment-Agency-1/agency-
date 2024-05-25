
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css modules/ApplyList.module.css';

const ApplyList = () => {
  const [appliedUsers, setAppliedUsers] = useState([]);

  useEffect(() => {
    const storedAppliedUsers = JSON.parse(localStorage.getItem('appliedCompanies')) || [];  // retrieve 'appliedCompanies'(containing the list of companies the user appliied to) from localStorage Then Converts the JSON string back into a JavaScript object/array
    //Snce a user can apply to more than one company we need to group companies by username
    const groupedApplications = storedAppliedUsers.reduce((acc, application) => { // now after getting the users who applied I use reduce to Iterate over storedAppliedUsers to accumulate its results in an object
      if (!acc[application.username]) {// if it's the first time a user applies
        acc[application.username] = []; // the user gets an empty array to push the companies he to applied into
      }
      acc[application.username].push(application.company);
      return acc;
    }, {});//initialize acc as an empty object

    setAppliedUsers(groupedApplications);// set the state to the updated users and their comapnies they applied to
  }, []);

  //this is for the button clear the Apply list 
  const handleClear = () => {
    localStorage.removeItem('appliedCompanies'); // we remove the item(object) from the localstorage
    setAppliedUsers([]); //then we reset the state that has the previous info stored
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/company" className={styles.navLink}>Back to Company Page</Link>
          </li>
        </ul>
      </nav>
      <h2 className={styles.heading}>List of Users that Applied</h2>
      <button onClick={handleClear} className={styles.clearButton}>Clear List of Users</button>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Username</th>
            <th className={styles.tableHeader}>Companies</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(appliedUsers).map(([username, companies], index) => (
            <tr key={index} className={styles.userRow}>
              <td className={styles.userData}>{username}</td>
              <td className={styles.userData}>{companies.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplyList;
