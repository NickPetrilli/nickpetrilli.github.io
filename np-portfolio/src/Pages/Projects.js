import React, { useState } from 'react';
import { projects, languageIcons } from '../data/projects';
import TiltCard from '../components/TiltCard';
import './Projects.css';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="projects-page">
      <h1 className="projects-heading">My Projects</h1>

      <div className="projects-grid">
        {projects.map((project) => (
          <TiltCard
            key={project.id}
            project={project}
            onClick={setSelectedProject}
            visible={true}
          />
        ))}
      </div>

      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}
          role="dialog" aria-modal="true" aria-label={selectedProject.title}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close">
              &times;
            </button>
            <div className="modal-img-wrap">
              <img src={selectedProject.imageUrl} alt={selectedProject.title} className="modal-img" />
            </div>
            <div className="modal-body">
              <h2 className="modal-title">{selectedProject.title}</h2>
              <p className="modal-desc">{selectedProject.longDescription || selectedProject.description}</p>
              <div className="modal-links">
                {selectedProject.demoUrl?.trim() && (
                  <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer" className="card-link">
                    [ VIEW {selectedProject.demoLabel || 'DEMO'} ]
                  </a>
                )}
                <a href={selectedProject.sourceCodeUrl} target="_blank" rel="noopener noreferrer" className="card-link">
                  [ VIEW CODE ]
                </a>
              </div>
              <div className="modal-icons">
                {selectedProject.languages.map((lang, i) =>
                  lang === '|'
                    ? <span key={`sep-${i}`} className="lang-separator" aria-hidden="true" />
                    : <span key={lang} data-tooltip={lang} className="card-icon">
                        {languageIcons[lang]}
                      </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
