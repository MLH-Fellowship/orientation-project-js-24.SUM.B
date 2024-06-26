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
    present: false,
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
      console.log(experience);
      const response = await axios.post("/resume/experience", {
        title: experience.title,
        company: experience.company,
        description: experience.description,
        logo: experience.logo,
        start_date: formatDate(experience.start_date),
        end_date: experience.present
          ? "Present"
          : formatDate(experience.end_date),
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
      <label htmlFor="title">Title</label>
      <input
        name="title"
        value={experience.title}
        onChange={handleChange}
        required
      />
      <label htmlFor="company">Company</label>
      <input
        name="company"
        value={experience.company}
        onChange={handleChange}
        required
      />
      <label htmlFor="start_date">Start Date</label>
      <input
        name="start_date"
        value={experience.start_date}
        onChange={handleChange}
        type="month"
        required
      />
      <label htmlFor="end_date">End Date</label>
      <div className="input-group">
        <input
          name="end_date"
          value={experience.end_date}
          onChange={handleChange}
          type="month"
          required={!experience.present}
          disabled={experience.present}
        />
        <button
          type="button"
          onClick={() => {
            setExperience({ ...experience, present: !experience.present });
          }}
          className={`toggle-button ${
            experience.present ? "toggle-pressed" : ""
          }`}
        >
          Present
        </button>
      </div>
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        value={experience.description}
        onChange={handleChange}
        required
      />
      <label htmlFor="logo">Logo URL</label>
      <input name="logo" value={experience.logo} onChange={handleChange} />
      <button type="submit">Add Experience</button>
      <button className="back-button" onClick={() => navigateTo("resume")}>
        Back
      </button>
    </form>
  );
}
