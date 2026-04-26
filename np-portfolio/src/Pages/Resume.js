import React from 'react';

const Resume = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 'calc(100vh - 60px)' }}>
      <iframe
        src="/documents/NP_Resume_2024.pdf"
        width="100%"
        style={{ flex: 1, border: 'none', minHeight: 'calc(100vh - 60px)' }}
        title="Resume"
      />
    </div>
    );
  };  

export default Resume;