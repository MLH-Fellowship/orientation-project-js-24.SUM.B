import "./App.css";
import { useState } from "react";
import Resume from "./Resume";
import AddEducation from "./AddEducation";
import AddSkill from "./AddSkill";

function App() {
  const [currentPage, setCurrentPage] = useState("resume");

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <h1>Resume Builder</h1>

      {currentPage === "resume" && <Resume navigateTo={navigateTo} />}
      {currentPage === "addEducation" && (
        <AddEducation navigateTo={navigateTo} />
      )}
      {currentPage === "addSkill" && <AddSkill navigateTo={navigateTo} />}
    </div>
  );
}

export default App;
