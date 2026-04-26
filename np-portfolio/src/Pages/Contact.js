import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact = () => {

  const cardStyle = {
    background: '#0d0d0d',
    border: '1px solid #00ff41',
    borderRadius: '8px',
    boxShadow: '0 0 12px rgba(0, 255, 65, 0.1)',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem 1.5rem',
    fontFamily: 'Courier New, monospace',
    textAlign: 'center',
  };

  const btnStyle = {
    background: 'transparent',
    border: '1px solid #00ff41',
    color: '#00ff41',
    fontFamily: 'Courier New, monospace',
    fontSize: '0.85rem',
    padding: '0.5rem 1.2rem',
    cursor: 'pointer',
    letterSpacing: '1px',
    textDecoration: 'none',
    display: 'inline-block',
    marginTop: 'auto',
  };

  const iconStyle = { fontSize: '3rem', color: '#00ff41', marginBottom: '1rem' };
  const titleStyle = { color: '#f9f9f9', fontSize: '1.3rem', margin: '0 0 0.5rem' };
  const detailStyle = { color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', margin: '0 0 1.5rem', lineHeight: '1.5' };

  return (
    <div style={{ padding: '2rem', backgroundColor: 'black', minHeight: '100vh', fontFamily: 'Courier New, monospace' }}>

      <h1 style={{ textAlign: 'center', color: '#f9f9f9', marginBottom: '2.5rem' }}>
        Connect with Me
      </h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>

        <div style={cardStyle}>
          <div style={iconStyle}><FaGithub /></div>
          <h2 style={titleStyle}>GitHub</h2>
          <p style={detailStyle}>@NickPetrilli</p>
          <a href="https://github.com/NickPetrilli" target="_blank" rel="noopener noreferrer" style={btnStyle}>
            [ VIEW PROFILE ]
          </a>
        </div>

        <div style={cardStyle}>
          <div style={{ ...iconStyle, color: '#0077b5' }}><FaLinkedin /></div>
          <h2 style={titleStyle}>LinkedIn</h2>
          <p style={detailStyle}>Nicholas Petrilli</p>
          <a href="https://www.linkedin.com/in/nicholas-petrilli-26aaa4225/" target="_blank" rel="noopener noreferrer" style={{ ...btnStyle, borderColor: '#0077b5', color: '#0077b5' }}>
            [ VIEW PROFILE ]
          </a>
        </div>

        <div style={cardStyle}>
          <div style={iconStyle}><FaEnvelope /></div>
          <h2 style={titleStyle}>Email</h2>
          <p style={detailStyle}>njpetrilli@verizon.net</p>
          <a href="mailto:njpetrilli@verizon.net" style={btnStyle}>
            [ SEND EMAIL ]
          </a>
        </div>

      </div>
    </div>
  );
};

export default Contact;