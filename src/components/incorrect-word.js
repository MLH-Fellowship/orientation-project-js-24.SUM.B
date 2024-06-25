import React from "react";

const IncorrectWord = ({ word, correct, onClick }) => {
  console.log("Word: ", word);
  console.log("Correct word: ", correct);
  return (
    <span className="incorrect" onClick={() => onClick(word, correct)}>
      {word}
      <span className="tooltip">{correct}</span>
    </span>
  );
};

export default IncorrectWord;
