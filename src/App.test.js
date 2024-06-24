import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import html2pdf from 'html2pdf.js';

// Mock the html2pdf.js library
jest.mock('html2pdf.js', () => {
  const mockHtml2pdf = {
    set: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    save: jest.fn().mockResolvedValue()
  };
  return jest.fn(() => mockHtml2pdf);
});

describe('App Component', () => {
  test('renders resume sections', () => {
    render(<App />);

    expect(screen.getByText(/Resume Builder/i)).toBeInTheDocument();
    expect(screen.getByText(/Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Education/i)).toBeInTheDocument();
    expect(screen.getByText(/Skills/i)).toBeInTheDocument();
  });

  test('renders buttons', () => {
    render(<App />);

    expect(screen.getByText(/Add Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Education/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Skill/i)).toBeInTheDocument();
    expect(screen.getByText(/Export/i)).toBeInTheDocument();
  });

  test('calls handleDownloadPdf function when Export button is clicked', () => {
    render(<App />);

    const exportButton = screen.getByText(/Export/i);
    fireEvent.click(exportButton);

    expect(html2pdf).toHaveBeenCalled();
  });

  test('html2pdf options are set correctly', () => {
    render(<App />);

    const exportButton = screen.getByText(/Export/i);
    fireEvent.click(exportButton);

    expect(html2pdf().set).toHaveBeenCalledWith({
      margin: 0,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, ignoreElements: expect.any(Function) },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    });
  });

  test('html2canvas ignoreElements function ignores elements with data-html2canvas-ignore attribute', () => {
    render(<App />);

    const exportButton = screen.getByText(/Export/i);
    fireEvent.click(exportButton);

    const ignoreElementsFunc = html2pdf().set.mock.calls[0][0].html2canvas.ignoreElements;

    const ignoredElement = document.createElement('button');
    ignoredElement.setAttribute('data-html2canvas-ignore', 'true');

    const notIgnoredElement = document.createElement('div');

    expect(ignoreElementsFunc(ignoredElement)).toBe(true);
    expect(ignoreElementsFunc(notIgnoredElement)).toBe(false);
  });
});

