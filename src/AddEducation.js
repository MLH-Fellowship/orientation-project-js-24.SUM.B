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

    // Format the date in the format "Month Year"
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long" };
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", options);
    };

    try {
      const response = await axios.post("/resume/education", {
        ...education,
        start_date: formatDate(education.start_date),
        end_date: formatDate(education.end_date),
        grade: `${education.grade}%`,
      });
      console.log(`Education added with ID: ${response.data.id}`);
      navigateTo("mainMenu");
    } catch (error) {
      console.error("Error adding education:", error);
      alert("Failed to add education.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="resumeSection">
      <h2>Add Education</h2>
      <label htmlFor="course">Course:</label>
      <input
        name="course"
        value={education.course}
        onChange={handleChange}
        required
      />
      <label htmlFor="school">School:</label>
      <input
        name="school"
        value={education.school}
        onChange={handleChange}
        required
      />
      <label htmlFor="start_date">Start Date:</label>
      <input
        name="start_date"
        type="month"
        value={education.start_date}
        onChange={handleChange}
        required
      />
      <label htmlFor="end_date">End Date:</label>
      <input
        name="end_date"
        type="month"
        value={education.end_date}
        onChange={handleChange}
        required
      />
      <label htmlFor="grade">Grade:</label>
      <input
        name="grade"
        type="number"
        min="0"
        max="100"
        value={education.grade}
        onChange={handleChange}
        required
      />
      <label htmlFor="logo">Logo URL:</label>
      <input
        name="logo"
        value={education.logo}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Education</button>
      <button className="back-button" onClick={() => navigateTo("resume")}>
        Back
      </button>
    </form>
  );
}

export default AddEducation;
