import React, {useState} from "react";

function PersonalInfo() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    number: "",
    email: ""
  })

  const handleChange = (e) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
  }

  return (

    <form className="resumeSection">
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
        <button type="submit">Save</button>
      </form>
  );
}

export default PersonalInfo;
