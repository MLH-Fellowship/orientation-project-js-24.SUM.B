import React, { useState, useRef } from "react";
import Sidebar from "./components/Sidebar";
import { getCorrectedContent, handleDownloadPdf } from "./utils";

export default function MainMenu({ navigateTo }) {
  const [content, setContent] = useState({
    experience: [
      "Experience Placeholder with a mistke.",
      "Another experience paragraph with an eror.",
    ],
    education: [
      "Education Placeholder with a eror.",
      "Another education paragraph with a mistke.",
    ],
    skills: [
      "Skill Placeholder with a typo.",
      "Another skill paragraph with a eror.",
    ],
  });

  const [corrections, setCorrections] = useState({
    experience: [
      { before: "mistke", after: "mistake" },
      { before: "eror", after: "error" },
    ],
    education: [
      { before: "eror", after: "error" },
      { before: "mistke", after: "mistake" },
    ],
    skills: [
      { before: "typo", after: "typo" },
      { before: "eror", after: "error" },
    ],
  });

  const [suggestions, setSuggestions] = useState({
    experience: [
      "Consider adding a project experience.",
      "Include metrics to show impact.",
    ],
    education: ["Add relevant coursework.", "Include academic honors."],
    skills: [
      "Highlight proficiency in specific tools.",
      "Include soft skills.",
    ],
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = (sectionName, sectionContent, corrections) => {
    return sectionContent.map((paragraph, index) => (
      <p key={index}>
        {getCorrectedContent(paragraph, corrections, sectionName)}
      </p>
    ));
  };

  const handleAcceptSuggestion = (sectionName, suggestion) => {
    setContent((prevContent) => {
      const updatedSection = [...prevContent[sectionName], suggestion];
      return {
        ...prevContent,
        [sectionName]: updatedSection,
      };
    });
    setSuggestions((prevSuggestions) => {
      const updatedSuggestions = prevSuggestions[sectionName].filter(
        (s) => s !== suggestion
      );
      return {
        ...prevSuggestions,
        [sectionName]: updatedSuggestions,
      };
    });
  };

  const resumeRef = useRef();

  return (
    <div ref={resumeRef}>
      <button className="open-sidebar-btn" onClick={toggleSidebar}>
        Show Suggestions
      </button>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        suggestions={suggestions}
        onAccept={handleAcceptSuggestion}
      />
      <div className="resumeSection">
        <h2>Experience</h2>
        {renderContent(
          "experience",
          content.experience,
          corrections.experience
        )}
        <button
          onClick={() => navigateTo("addExperience")}
          data-html2canvas-ignore="true"
        >
          Add Experience
        </button>
        <br></br>
      </div>
      <div className="resumeSection">
        <h2>Education</h2>
        {renderContent("education", content.education, corrections.education)}
        <button
          onClick={() => navigateTo("addEducation")}
          data-html2canvas-ignore="true"
        >
          Add Education
        </button>
        <br></br>
      </div>
      <div className="resumeSection">
        <h2>Skills</h2>
        {renderContent("skills", content.skills, corrections.skills)}
        <button
          onClick={() => navigateTo("addSkill")}
          data-html2canvas-ignore="true"
        >
          Add Skill
        </button>
        <br></br>
      </div>
      <br></br>
      <button
        onClick={() => handleDownloadPdf(resumeRef.current)}
        data-html2canvas-ignore="true"
      >
        Export
      </button>
    </div>
  );
}
