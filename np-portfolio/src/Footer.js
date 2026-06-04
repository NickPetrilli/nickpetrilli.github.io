import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-prompt" aria-hidden="true">&gt;&nbsp;</span>
        <span className="footer-copy">&copy; {new Date().getFullYear()} Nicholas Petrilli</span>
        <div className="footer-links">
          <a
            href="https://github.com/NickPetrilli"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-link social--github"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/nicholas-petrilli-26aaa4225/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-link social--linkedin"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:njpetrilli@verizon.net"
            className="footer-icon-link social--email"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
