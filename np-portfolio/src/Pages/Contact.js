import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import SpinningCube from '../components/SpinningCube';
import './Contact.css';

const contacts = [
  {
    icon: <FaGithub />,
    label: 'GitHub',
    detail: '@NickPetrilli',
    href: 'https://github.com/NickPetrilli',
    btnText: '[ VIEW PROFILE ]',
    external: true,
    accent: '#00FF00',
  },
  {
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    detail: 'Nicholas Petrilli',
    href: 'https://www.linkedin.com/in/nicholas-petrilli-26aaa4225/',
    btnText: '[ VIEW PROFILE ]',
    external: true,
    accent: '#0A66C2',
  },
  {
    icon: <FaEnvelope />,
    label: 'Email',
    detail: 'njpetrilli@verizon.net',
    href: 'mailto:njpetrilli@verizon.net',
    btnText: '[ SEND EMAIL ]',
    external: false,
    accent: '#00FF00',
  },
];

const Contact = () => {
  return (
    <div className="contact-page">
      <SpinningCube />
      <h1 className="contact-heading">Connect with Me</h1>

      <div className="contact-grid">
        {contacts.map(({ icon, label, detail, href, btnText, external, accent }) => (
          <div key={label} className="contact-card">
            <div className="contact-icon" style={{ color: accent }}>{icon}</div>
            <h2 className="contact-label">{label}</h2>
            <p className="contact-detail">{detail}</p>
            <a
              href={href}
              className="contact-btn"
              style={{ borderColor: accent, color: accent }}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {btnText}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
