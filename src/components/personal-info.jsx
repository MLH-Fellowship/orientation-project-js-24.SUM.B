import React, {useState} from "react";

function PersonalInfo() {
  const [name, setName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleName = (e) =>{
    setName(e.target.value);
  }

  return (

    <form className="resumeSection">
        <h2>Personal Information</h2>

        <label for="name">Enter your full name: </label>
        <input type="text" class="name" onChange={(e)=>handleName(e)}></input>
        <br></br>

        <label for="email">Enter your phone number: </label>
        <input type="text" class="email" size="4" value="+"></input>
        <input type="email" class="email"></input>
        <br></br>

        <label for="email">Enter your email address: </label>
        <input type="tel" class="phoneNumber"></input>
        <button type="submit">Save</button>
      </form>
  );
}

export default PersonalInfo;
