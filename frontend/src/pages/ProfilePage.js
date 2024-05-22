import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

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

  return (
    <div>
      <h2>Profile Page</h2>
      {profiles.map(profile => (
        <div key={profile.id}>
          <img src={profile.image} alt={`${profile.name}'s profile`} />
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Age: {profile.age}</p>
          <p>Phone: {profile.phone}</p>
          <p>Specialty: {profile.specialty}</p>
          <p>Years of Experience: {profile.yearsOfExperience}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfilePage;
