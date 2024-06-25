// src/AddEducation.js
import "./Form.css";
import React, { useState } from "react";
import axios from "axios";

function AddEducation({ navigateTo }) {
  const [education, setEducation] = useState({
    course: "",
    school: "",
    start_date: "",
    end_date: "",
    grade: "",
    logo: "",
  });

  const handleChange = (e) => {
    setEducation({ ...education, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/resume/education", education);
      alert(`Education added with ID: ${response.data.id}`);
      navigateTo("mainMenu");
    } catch (error) {
      console.error("Error adding education:", error);
      alert("Failed to add education.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="resumeSection">
      <h2>Add Education</h2>
      <input
        name="course"
        value={education.course}
        onChange={handleChange}
        placeholder="Course"
        required
      />
      <input
        name="school"
        value={education.school}
        onChange={handleChange}
        placeholder="School"
        required
      />
      <input
        name="start_date"
        value={education.start_date}
        onChange={handleChange}
        placeholder="Start Date"
        required
      />
      <input
        name="end_date"
        value={education.end_date}
        onChange={handleChange}
        placeholder="End Date"
        required
      />
      <input
        name="grade"
        value={education.grade}
        onChange={handleChange}
        placeholder="Grade"
        required
      />
      <input
        name="logo"
        value={education.logo}
        onChange={handleChange}
        placeholder="Logo URL"
        required
      />
      <button type="submit">Add Education</button>
      <button className="back-button" onClick={() => navigateTo("mainMenu")}>
        Back
      </button>
    </form>
  );
}

export default AddEducation;
