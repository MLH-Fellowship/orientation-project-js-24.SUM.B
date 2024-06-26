import "./App.css";
import { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import IncorrectWord from "./components/incorrect-word";
import Sidebar from "./components/Sidebar";

function App() {
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

  const [suggestions, setSuggestions] = useState({
    experience: ["Consider adding a project experience.", "Include metrics to show impact."],
    education: ["Add relevant coursework.", "Include academic honors."],
    skills: ["Highlight proficiency in specific tools.", "Include soft skills."],
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  const addSuggestion = (sectionName, suggestion) => {
    setContent((prevContent) => {
      const updatedSection = [...prevContent[sectionName], suggestion];
      return {
        ...prevContent,
        [sectionName]: updatedSection,
      };
    });
    // Optionally, remove the accepted suggestion from the suggestions list
    setSuggestions((prevSuggestions) => {
      const updatedSuggestions = prevSuggestions[sectionName].filter(s => s !== suggestion);
      return {
        ...prevSuggestions,
        [sectionName]: updatedSuggestions,
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
    <div className="App" ref={resumeRef}>
      <h1>Resume Builder</h1>
      <button className="open-sidebar-btn" onClick={toggleSidebar}>Show Suggestions</button>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        suggestions={suggestions}
        onAccept={addSuggestion}
      />
      <div className="resumeSection">
        <h2>Experience</h2>
        {renderContent(
          "Experience",
          content.experience,
          corrections.experience
        )}
        <button data-html2canvas-ignore="true">Add Experience</button>
        <br></br>
      </div>
      <div className="resumeSection">
        <h2>Education</h2>
        {renderContent("Education", content.education, corrections.education)}
        <button data-html2canvas-ignore="true">Add Education</button>
        <br></br>
      </div>
      <div className="resumeSection">
        <h2>Skills</h2>
        {renderContent("Skills", content.skills, corrections.skills)}
        <button data-html2canvas-ignore="true">Add Skill</button>
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

export default App;

