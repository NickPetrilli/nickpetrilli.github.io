import React from 'react';

const Resume = () => {
    return (

      <div 
      id="divMain" 
      style={{ width: '100%', height: 'auto' }} 
      className="scroll"
  >
      <iframe 
          src="/documents/NP_Resume_2024.pdf" 
          width="100%" 
          height="800px"
          title="Resume"
      ></iframe>
  </div>

    );
  };

export default Resume;