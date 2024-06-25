import "./App.css";
import { useState } from "react";
import MainMenu from "./MainMenu";
import AddEducation from "./AddEducation";
import AddExperience from "./AddExperience";

function App() {
  const [currentPage, setCurrentPage] = useState("mainMenu");

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <h1>Resume Builder</h1>

      {currentPage === "mainMenu" && <MainMenu navigateTo={navigateTo} />}
      {currentPage === "addEducation" && (
        <AddEducation navigateTo={navigateTo} />
      )}
      {currentPage === "addExperience" && (
        <AddExperience navigateTo={navigateTo} />
      )}
    </div>
  );
}

export default App;
