import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/',         label: 'Home'     },
  { to: '/resume',   label: 'Resume'   },
  { to: '/projects', label: 'Projects' },
];

const SOCIAL_LINKS = [
  { href: 'https://github.com/NickPetrilli',                          icon: <FaGithub />,   label: 'GitHub',   cls: 'social--github'   },
  { href: 'https://www.linkedin.com/in/nicholas-petrilli-26aaa4225/', icon: <FaLinkedin />, label: 'LinkedIn', cls: 'social--linkedin' },
  { href: 'mailto:njpetrilli@verizon.net',                            icon: <FaEnvelope />, label: 'Email',    cls: 'social--email'    },
];

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="navbar" aria-label="Main navigation">
      <span className="navbar-logo" aria-hidden="true">NP<span className="logo-sep">//</span></span>

      <ul className="nav-list">
        {NAV_LINKS.map(({ to, label }) => {
          const active = location.pathname === to;
          return (
            <li key={to} className="nav-item">
              <Link
                to={to}
                className={`nav-link${active ? ' nav-link--active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {active && <span className="nav-prompt" aria-hidden="true">&gt;&nbsp;</span>}
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="nav-social">
        {SOCIAL_LINKS.map(({ href, icon, label, cls }) => (
          <a
            key={label}
            href={href}
            className={`nav-social-link ${cls}`}
            aria-label={label}
            data-tooltip={label}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
          >
            {icon}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
