import React from 'react';
import './Resume.css';

const Resume = () => {
  return (
    <div className="resume-page">
      <div className="resume-header">
        <a
          href="/documents/NP_Resume_2024.pdf"
          download
          className="resume-download-btn"
          aria-label="Download resume PDF"
        >
          [ DOWNLOAD ]
        </a>
      </div>
      <div className="resume-frame-wrap">
        <iframe
          src="/documents/NP_Resume_2024.pdf"
          title="Nicholas Petrilli Resume"
          className="resume-iframe"
        />
      </div>
    </div>
  );
};

export default Resume;
