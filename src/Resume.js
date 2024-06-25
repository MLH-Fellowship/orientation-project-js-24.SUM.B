import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import IncorrectWord from "./components/incorrect-word";

export default function MainMenu({ navigateTo }) {
  const handleDownloadPdf = (resume) => {
    const opt = {
      margin: 0,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        ignoreElements: (element) =>
          element.hasAttribute("data-html2canvas-ignore"),
      },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(resume).save();
  };

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

  const applyCorrection = (sectionName, incorrectWord, correctWord) => {
    setContent((prevContent) => {
      const updatedSection = prevContent[sectionName].map((paragraph) =>
        paragraph
          .split(" ")
          .map((word) =>
            word.replace(/[^\w\s]/g, "") === incorrectWord ? correctWord : word
          )
          .join(" ")
      );
      return {
        ...prevContent,
        [sectionName]: updatedSection,
      };
    });
  };

  const getCorrectedContent = (paragraph, corrections, sectionName) => {
    const regex = /(\b\w+\b|[^\w\s]+)/g;
    const parts = paragraph.match(regex);
    let elements = [];

    parts.forEach((part, index) => {
      const strippedPart = part.replace(/[^\w\s]/g, "");
      const correction = corrections.find((c) => c.before === strippedPart);
      if (correction) {
        elements.push(
          <IncorrectWord
            key={index}
            word={part}
            correct={correction.after}
            onClick={(incorrectWord, correctWord) =>
              applyCorrection(sectionName, incorrectWord, correctWord)
            }
          />
        );
      } else {
        elements.push(<span key={index}>{part}</span>);
      }
      // Add a space after each part except the last one
      if (index < parts.length - 1) {
        elements.push(<span key={`space-${index}`}> </span>);
      }
    });

    return elements;
  };

  const renderContent = (sectionName, sectionContent, corrections) => {
    return sectionContent.map((paragraph, index) => (
      <p key={index}>
        {getCorrectedContent(paragraph, corrections, sectionName)}
      </p>
    ));
  };

  const resumeRef = useRef();

  return (
    <div ref={resumeRef}>
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
