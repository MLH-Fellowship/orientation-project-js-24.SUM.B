import IncorrectWord from "./components/incorrect-word";
import html2pdf from "html2pdf.js";

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Spell check functions

export const applyCorrection = (sectionName, incorrectWord, correctWord, setContent) => {
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

export const getCorrectedContent = (paragraph, corrections, sectionName) => {
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

// Download PDF function

export const handleDownloadPdf = (resume) => {
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

