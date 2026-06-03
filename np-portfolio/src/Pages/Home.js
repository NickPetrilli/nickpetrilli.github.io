import React, { useState, useEffect, useRef, useCallback } from 'react';
import { projects } from '../data/projects';
import ParticleWave from '../components/ParticleWave';
import ProjectSlide from '../components/ProjectSlide';
import CpuRings       from '../components/animations/CpuRings';
import WireframeGlobe from '../components/animations/WireframeGlobe';
import MemoryBlocks   from '../components/animations/MemoryBlocks';
import CardFan        from '../components/animations/CardFan';
import CircuitBoard   from '../components/animations/CircuitBoard';
import DotClusters    from '../components/animations/DotClusters';
import NeuralNetwork  from '../components/animations/NeuralNetwork';
import ParallelStreams from '../components/animations/ParallelStreams';
import './Home.css';

const NAME = 'Nick Petrilli';

const ANIM_MAP = {
  cpu:      CpuRings,
  globe:    WireframeGlobe,
  memory:   MemoryBlocks,
  cards:    CardFan,
  circuit:  CircuitBoard,
  clusters: DotClusters,
  neural:   NeuralNetwork,
  streams:  ParallelStreams,
};

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

const Home = () => {
  const [scrollPct,  setScrollPct]  = useState(0);
  const [heroOffset, setHeroOffset] = useState(0);
  const numbersRef = useRef(null);
  const dividerRef = useRef(null);
  const dividerInView = useInView(dividerRef);

  /* Background numbers */
  useEffect(() => {
    const el = numbersRef.current;
    if (!el) return;
    const fill = () => {
      const charH = 48, charW = charH * 0.55;
      const cols = Math.ceil(window.innerWidth  / charW) + 4;
      const rows = Math.ceil(window.innerHeight / charH) + 4;
      el.innerHTML = Array.from({ length: cols * rows },
        () => `<span>${Math.floor(Math.random() * 10)}</span>`).join('');
    };
    fill();
    window.addEventListener('resize', fill);
    return () => window.removeEventListener('resize', fill);
  }, []);

  /* Scroll: progress bar + hero parallax */
  const onScroll = useCallback(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    setScrollPct((window.scrollY / max) * 100);
    setHeroOffset(window.scrollY * 0.3);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return (
    <>
      {/* Fixed green scroll progress bar */}
      <div className="scroll-progress-bar" style={{ height: `${scrollPct}%` }} aria-hidden="true" />

      {/* ══════════ HERO ══════════ */}
      <section id="hero" className="home-container">
        <ParticleWave />
        <div className="scanlines" aria-hidden="true" />
        <div className="numbers-overlay" aria-hidden="true">
          <p className="numbers" ref={numbersRef} />
        </div>

        <div className="hero-content" style={{ transform: `translateY(${heroOffset}px)` }}>
          <div className="profile-pic-container">
            <img src="/images/Graduation Pic.png" alt="Nick Petrilli" className="profile-pic" />
          </div>

          <h1 className="glitch-name" data-text={NAME} aria-label={NAME}>
            {NAME.split('').map((char, i) => (
              <span key={i} className="char-reveal" style={{ animationDelay: `${0.05 * i}s` }}>
                {char === ' ' ? ' ' : char}
              </span>
            ))}
          </h1>

          <h2 className="hero-role">
            Software Developer<span className="cursor" aria-hidden="true">_</span>
          </h2>

          <p className="hero-bio">
            MS &amp; BS Computer Science · Marist College · Building innovative web applications
            and tackling challenging problems. Scroll to explore my work.
          </p>

          <div className="scroll-cue" aria-hidden="true">
            <span className="scroll-cue-text">scroll</span>
            <div className="scroll-cue-arrow" />
          </div>
        </div>
      </section>

      {/* ══════════ DIVIDER ══════════ */}
      <div ref={dividerRef} className={`section-divider${dividerInView ? ' divider-in' : ''}`} aria-hidden="true">
        <span className="divider-line divider-line-left" />
        <span className="divider-label">&gt; MY_PROJECTS.EXE</span>
        <span className="divider-line divider-line-right" />
      </div>

      {/* ══════════ PROJECT SLIDES ══════════ */}
      {projects.map((project, idx) => (
        <ProjectSlide
          key={project.id}
          project={project}
          index={idx}
          AnimComponent={ANIM_MAP[project.animKey]}
        />
      ))}
    </>
  );
};

export default Home;
