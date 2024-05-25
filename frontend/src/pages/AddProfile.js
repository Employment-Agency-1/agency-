import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../css modules/AddProfile.module.css';

function AddProfile() {
  const [file, setPhoto] = useState(null);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
//profile creation
  const createProfile = () => {
    axios.post(`/api/profiles`, {
      name: name,
      email: email,
      image: image,
      age: age,
      phone: phone,
      specialty: specialty,
      yearsOfExperience: experience,
    }).then((response) => {
      console.log(response);
      alert("Profile created successfully");
    }).catch((err) => {
      console.log(err);
    });
  };
//Clouldinary
  const uploadPhoto = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", "agenceFactory");

    axios.post(`https://api.cloudinary.com/v1_1/dcyeimdps/upload`, formData).then((response) => {
      console.log(response.data.secure_url);
      setImage(response.data.secure_url);
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <Link to="/profile" className={styles.navLink}>Click to Check Your Profile In The List Of All Profiles</Link>
      </nav>
      <div className={styles.container}>
        <div className={styles.profileCard}>
          <h1 className={styles.titletop}>𝑪𝒓𝒆𝒂𝒕𝒆 𝑷𝒓𝒐𝒇𝒊𝒍𝒆 📧</h1>
          <div className={styles.profilePhotoContainer}>
            {file ? (
              <img src={image} alt="Profile" className={styles.profilePhoto} />
            ) : (
              <div id="imageee">
                <div className={styles.placeholderPhoto}>
                  <img src="https://icon-library.com/images/add-photo-icon/add-photo-icon-19.jpg" alt="" width={80} id="ico" />
                  <input
                    className={styles.ipt}
                    type="file"
                    onChange={(e) => { setPhoto(e.target.files[0]) }}
                  />
                </div>
              </div>
            )}
          </div>
          <button className={styles.uploadButton} onClick={uploadPhoto}>Upload</button>
          <div className={styles.profileName}>
            <p className={styles.label}>Name:</p>
            <input type="text" className={styles.input} placeholder="name" onChange={(e) => { setName(e.target.value) }} />
          </div>
          <div className={styles.profileName}>
            <p className={styles.label}>Age:</p>
            <input type="text" className={styles.input} placeholder="age" onChange={(e) => { setAge(e.target.value) }} />
          </div>
          <div className={styles.profileName}>
            <p className={styles.label}>Experience:</p>
            <input type="text" className={styles.input} placeholder="experience" onChange={(e) => { setExperience(e.target.value) }} />
          </div>
          <div className={styles.profileName}>
            <p className={styles.label}>Specialty:</p>
            <input type="text" className={styles.input} placeholder="specialty" onChange={(e) => { setSpecialty(e.target.value) }} />
          </div>
          <div className={styles.profileContact}>
            <p className={styles.label}>Email:</p>
            <input type="text" className={styles.input} placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
            <p className={styles.label}>Phone:</p>
            <input type="text" className={styles.input} placeholder="phone" onChange={(e) => { setPhone(e.target.value) }} />
          </div>
          <button className={styles.saveButton} onClick={createProfile}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default AddProfile;
