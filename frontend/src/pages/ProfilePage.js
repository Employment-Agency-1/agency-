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
        <div key={profile.id} className="profile-card">
          <img src={profile.image} alt={`${profile.name}'s profile`} className="profile-image" />
          <div className="profile-info">
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