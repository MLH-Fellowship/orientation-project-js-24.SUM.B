import "./Form.css";
import React, { useState } from "react";
import axios from "axios";

export default function AddSkill({ navigateTo }) {
  const [skill, setSkill] = useState({
    name: "",
    proficiency: "",
    logo: "",
  });

  const handleChange = (e) => {
    setSkill({ ...skill, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/resume/skill", {
        name: skill.name,
        proficiency: skill.proficiency,
        logo: skill.logo,
      });
      console.log(`Skill added with ID: ${response.data.id}`);
      navigateTo("mainMenu");
    } catch (error) {
      console.error("Error adding skill:", error);
      alert("Failed to add skill.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="resumeSection">
      <h2>Add Skill</h2>
      <label htmlFor="name">Skill:</label>
      <input name="name" value={skill.name} onChange={handleChange} required />
      <label htmlFor="proficiency">Proficiency:</label>
      <input
        name="proficiency"
        value={skill.proficiency}
        onChange={handleChange}
        required
      />
      <label htmlFor="logo">Logo:</label>
      <input name="logo" value={skill.logo} onChange={handleChange} required />
      <button type="submit">Add Skill</button>
      <button className="back-button" onClick={() => navigateTo("resume")}>
        Back
      </button>
    </form>
  );
}
