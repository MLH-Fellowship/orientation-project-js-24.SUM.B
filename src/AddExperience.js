// src/AddExperience.js
import "./Form.css";
import React, { useState } from "react";
import axios from "axios";

export default function AddExperience({ navigateTo }) {
  const [experience, setExperience] = useState({
    title: "",
    company: "",
    start_date: "",
    end_date: "",
    description: "",
    logo: "",
  });

  const handleChange = (e) => {
    setExperience({ ...experience, [e.target.name]: e.target.value });
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
      const response = await axios.post("/resume/experience", {
        ...experience,
        start_date: formatDate(experience.start_date),
        end_date: formatDate(experience.end_date),
      });
      console.log(`Experience added with ID: ${response.data.id}`);
      navigateTo("mainMenu");
    } catch (error) {
      console.error("Error adding experience:", error);
      alert("Failed to add experience.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="resumeSection">
      <h2>Add Experience</h2>
      <input
        name="title"
        value={experience.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        name="company"
        value={experience.company}
        onChange={handleChange}
        placeholder="Company"
        required
      />
      <input
        name="start_date"
        value={experience.start_date}
        onChange={handleChange}
        type="month"
        required
      />
      <input
        name="end_date"
        value={experience.end_date}
        onChange={handleChange}
        type="month"
        required
      />
      <textarea
        name="description"
        value={experience.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        name="logo"
        value={experience.logo}
        onChange={handleChange}
        placeholder="Logo URL"
      />
      <button type="submit">Add Experience</button>
      <button className="back-button" onClick={() => navigateTo("mainMenu")}>
        Back
      </button>
    </form>
  );
}
