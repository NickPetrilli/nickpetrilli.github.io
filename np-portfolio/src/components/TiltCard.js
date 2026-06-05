import React, { useState } from 'react';
import { languageIcons } from '../data/projects';

const TILT = 14;

const TiltCard = ({ project, onClick, animDelay = 0, visible = true }) => {
  const [tilt, setTilt]       = useState({ x: 0, y: 0 });
  const [glow, setGlow]       = useState({ x: 50, y: 50 });

  const handleMove = (e) => {
    const r    = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - r.left)  / r.width  - 0.5;
    const yPct = (e.clientY - r.top)   / r.height - 0.5;
    setTilt({ x: yPct * -TILT, y: xPct * TILT });
    setGlow({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const handleLeave = () => setTilt({ x: 0, y: 0 });

  const isResting = tilt.x === 0 && tilt.y === 0;

  return (
    <div
      className="tilt-wrap"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: '900px' }}
    >
      <div
        className={`project-card${visible ? ' card-visible' : ''}`}
        onClick={() => onClick(project)}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${project.title}`}
        onKeyDown={(e) => e.key === 'Enter' && onClick(project)}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isResting
            ? 'transform 0.5s ease, box-shadow 0.5s ease, opacity 0.6s ease, translate 0.6s ease'
            : 'transform 0.1s ease',
          '--glow-x': `${glow.x}%`,
          '--glow-y': `${glow.y}%`,
          animationDelay: `${animDelay}s`,
        }}
      >
        <div className="card-img-wrap">
          <img src={project.imageUrl} alt={project.title} className="card-img" />
        </div>
        <div className="card-body">
          <h2 className="card-title">{project.title}</h2>
          <p className="card-desc">{project.description}</p>
          <div className="card-links">
            {project.demoUrl?.trim() && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                className="card-link" onClick={(e) => e.stopPropagation()}>
                [ DEMO ]
              </a>
            )}
            <a href={project.sourceCodeUrl} target="_blank" rel="noopener noreferrer"
              className="card-link" onClick={(e) => e.stopPropagation()}>
              [ CODE ]
            </a>
          </div>
        </div>
        <div className="card-icons">
          {project.languages.map((lang) => (
            <span key={lang} title={lang} className="card-icon">
              {languageIcons[lang]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TiltCard;
