import React, {useState} from "react";
import axios from 'axios';

function PersonalInfo() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    number: "",
    email: ""
  })

  const handleChange = (e) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
  }

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/resume/personal", //update the route after it's implemented in the backend
      ...userInfo);
      console.log(`user info added with ID: ${response.data.id}`);
      //navigateTo("mainMenu");
    } catch (error) {
      console.error("Error adding user info:", error);
      alert("Failed to add user info.");
    }
}; 
  return (

    <form onSubmit={handleSubmit} className="resumeSection">
        <h2>Personal Information</h2>

        <label for="name">Enter your full name: </label>
        <input type="text" name="name" onChange={handleChange}></input>
        <br></br>

        <label for="email">Enter your phone number: </label>
        <input type="text" size="4" placeholder="+"></input>
        <input type="email" name="email"></input>
        <br></br>

        <label for="email">Enter your email address: </label>
        <input type="tel" name="number"></input>
        
        <label for="profile-pic">Upload you profile picture here: </label>
        <input type="file" name="file" onChange={handleChange}/>

        <button type="submit">Save</button>
      </form>
  );
}

export default PersonalInfo;
