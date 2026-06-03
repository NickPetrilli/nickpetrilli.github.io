import React, { useState, useEffect, useRef } from 'react';
import { languageIcons } from '../data/projects';
import './ProjectSlide.css';

const ProjectSlide = ({ project, index, AnimComponent }) => {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const even = index % 2 === 1; // alternate layout

  return (
    <section
      ref={ref}
      className={`project-slide${active ? ' slide-active' : ''}${even ? ' slide-even' : ''}`}
      id={`project-${project.id}`}
    >
      {/* ── Info panel ── */}
      <div className="slide-info">
        <span className="slide-num">
          {String(index + 1).padStart(2, '0')}
        </span>

        <h2 className="slide-title">{project.title}</h2>

        <div className="slide-rule" />

        <p className="slide-desc">{project.longDescription || project.description}</p>

        <div className="slide-links">
          {project.demoUrl?.trim() && (
            <a href={project.demoUrl} className="slide-btn"
              target="_blank" rel="noopener noreferrer">[ DEMO ]</a>
          )}
          <a href={project.sourceCodeUrl} className="slide-btn"
            target="_blank" rel="noopener noreferrer">[ CODE ]</a>
        </div>

        <div className="slide-langs">
          {project.languages.map((lang) => (
            <span key={lang} title={lang} className="slide-lang">
              {languageIcons[lang]}
            </span>
          ))}
        </div>
      </div>

      {/* ── Animation panel ── */}
      <div className="slide-anim-panel">
        <AnimComponent active={active} />
      </div>
    </section>
  );
};

export default ProjectSlide;
