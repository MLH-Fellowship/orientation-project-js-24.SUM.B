import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import html2pdf from "html2pdf.js";

// Mock the html2pdf.js library
jest.mock("html2pdf.js", () => {
  const mockHtml2pdf = {
    set: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    save: jest.fn().mockResolvedValue(),
  };
  return jest.fn(() => mockHtml2pdf);
});

describe("App Component", () => {
  test("renders resume sections", () => {
    render(<App />);

    expect(screen.getByText(/Resume Builder/i)).toBeInTheDocument();
    expect(screen.getByText(/Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Education/i)).toBeInTheDocument();
    expect(screen.getByText(/Skills/i)).toBeInTheDocument();
  });

  test("renders buttons", () => {
    render(<App />);

    expect(screen.getByText(/Add Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Education/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Skill/i)).toBeInTheDocument();
    expect(screen.getByText(/Export/i)).toBeInTheDocument();
  });
});
