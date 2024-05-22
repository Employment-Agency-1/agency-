// AddProfile.js

import React, { useState } from 'react';
import axios from 'axios';


function AddProfile() {
  const [file, setphoto] = useState(null);
  const [image,setimage]=useState('')
  const [name,setname]=useState('')
  const [age,setage]=useState('')
  const [experience,setexperience]=useState('')
  const [specialty,setspecial]=useState('')
  const [email,setemail]=useState('')
  const [phone,setphone]=useState('')
  


  // Cloud name mtai: dcyeimdps
  // name of preset: agenceFactory
  
  // api cloudinary: https://api.cloudinary.com/v1_1/

const creating=()=>{
  axios.post(`/api/profiles`,{
    name:name,
    email:email,
    image:image,
    age:age,
    phone:phone,
    specialty:specialty,
    yearsOfExperience:experience,

  }).then((response)=>{
    console.log(response)
    alert("you create profile")
  }).catch((err)=>{console.log(err)})
}


 const telechargementphoto=  ()=>{
  const form= new FormData()
  form.append('file',file)
  form.append("upload_preset","agenceFactory")

   axios.post(`https://api.cloudinary.com/v1_1/dcyeimdps/upload`,form).then((response)=>{
      console.log(response.data.secure_url)
      setimage(response.data.secure_url)
  }).catch((err)=>{console.log(err)})

 }


  return (

      <div className="profile-card">
                    <div><h1>Profile</h1> </div>
          <div className="profile-photo-container">
              
              {file ? (<>
                  <img src={image} alt="Profile" className="profile-photo" />
                   
                   </>) : (<div id="imageee">
                  <div className="placeholder-photo"> <img src="https://icon-library.com/images/add-photo-icon/add-photo-icon-19.jpg" alt="" width={80} id="ico" />
                  <input className="ipt" type="file"  value={file} onChange={(e)=>{setphoto(e.target.files[0])}} />
                  </div>
                   
                   </div>)}
          </div>
          
          
          <button onClick={()=>telechargementphoto()}>upload</button>
          <div className="profile-name">name: <input type="text" placeholder="name" onChange={(e)=>{setname(e.target.value)}} /> </div>
          <div className="profile-name">age: <input type="text" placeholder="age" onChange={(e)=>{setage(e.target.value)}}/> </div>
          <div className="profile-name"> experience:  <input type="text" placeholder="experience" onChange={(e)=>{setexperience(e.target.value)}} /> </div>
          <div className="profile-name"> specialty:  <input type="text" placeholder="experience" onChange={(e)=>{setspecial(e.target.value)}} /> </div>
          <div className="profile-contact">
              <p>Email: <input type="text" placeholder="email" onChange={(e)=>{setemail(e.target.value)}}/></p>
              <p>Phone: <input type="text" placeholder="number Phone"  onChange={(e)=>{setphone(e.target.value)}}/> </p>
              <button onClick={()=>{creating()}}> save </button>
          </div>
      </div>
  );
  
}

export default AddProfile;
