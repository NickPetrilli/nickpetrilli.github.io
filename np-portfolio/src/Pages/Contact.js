import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
    return (
        <div style={{ textAlign: 'center', backgroundColor: '#0f0e0e'}}>
             <h1 style={{ textAlign: 'center', color: '#f9f9f9' }}> Connect with Me </h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '2rem' }}>
                {/* GitHub Icon */}
                <a 
                    href="https://github.com/NickPetrilli" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="GitHub"
                    style={{ color: '#f9f9f9' }} 
                >
                    <FaGithub />
                </a>

                {/* LinkedIn Icon */}
                <a 
                    href="https://www.linkedin.com/in/nicholas-petrilli-26aaa4225/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="LinkedIn"
                    style={{ color: '#0077b5' }} 
                >
                    <FaLinkedin />
                </a>

                {/* Email Icon */}
                <a 
                    href="mailto:njpetrilli@verizon.net" 
                    aria-label="Email"
                    style={{ color: '#0077b5' }} 
                >
                    <FaEnvelope />
                </a>
            </div>
        </div>
    );
};

export default Contact;
