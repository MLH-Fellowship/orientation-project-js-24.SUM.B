import "./App.css";
import { useState } from "react";
import Resume from "./Resume";
import AddEducation from "./AddEducation";
import AddSkill from "./AddSkill";
import AddExperience from "./AddExperience";
import html2pdf from "html2pdf.js";
import IncorrectWord from "./components/incorrect-word";
import PersonalInfo from "./components/personal-info";

function App() {
  const [currentPage, setCurrentPage] = useState("resume");

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <h1>Resume Builder</h1>
      <PersonalInfo />

      {currentPage === "resume" && <Resume navigateTo={navigateTo} />}
      {currentPage === "addEducation" && (
        <AddEducation navigateTo={navigateTo} />
      )}
      {currentPage === "addSkill" && <AddSkill navigateTo={navigateTo} />}
      {currentPage === "addExperience" && (
        <AddExperience navigateTo={navigateTo} />
      )}
    </div>
  );
}

export default App;
