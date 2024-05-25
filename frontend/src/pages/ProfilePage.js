import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../css modules/ProfilePage.module.css';

const ProfilePage = () => {
  const [profiles, setProfiles] = useState([]); // this is for rendering all profiles
  const [selectedProfile, setSelectedProfile] = useState(null); //this state is for rendering only one Profile

  useEffect(() => {
    fetchProfiles();
  }, []);
// use this to fetch all info about a profile from Profile Table
  const fetchProfiles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/profiles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Profile data:', response.data);
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const handleProfileClick = (profile) => {
    // // first we check if there is already a selected profile and if it's the same one as the clicked profile
    if (selectedProfile && selectedProfile.id === profile.id) {
      setSelectedProfile(null); // Deselect if the same profile is clicked again
    } else {
      setSelectedProfile(profile);//// else we select the clicked profile if it's not already selected
    }
  };
//in the code belows we'll either display ONLY the selectedProfile meaning only the selected profile will be displayed else set to the profiles array.
  const displayedProfiles = selectedProfile ? [selectedProfile] : profiles;

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link to="/user" className={styles.navLink}>Click Here To Go Back To User Page</Link>
      </nav>
      <h2 className={styles.title}>Profiles Page</h2>
      {displayedProfiles.map(profile => (
        <div key={profile.id} className={styles['profile-card']} onClick={() => handleProfileClick(profile)}>
          <img src={profile.image} alt={`${profile.name}'s profile`} className={styles['profile-image']} />
          <div className={styles['profile-info']}>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Age:</strong> {profile.age}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Specialty:</strong> {profile.specialty}</p>
            <p><strong>Years of Experience:</strong> {profile.yearsOfExperience}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfilePage;
