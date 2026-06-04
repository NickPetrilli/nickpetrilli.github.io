import React, { useState, useEffect, useRef, useCallback } from 'react';
import { projects } from '../data/projects';
import HeroScene    from '../components/HeroScene';
import ProjectSlide from '../components/ProjectSlide';
import WarpTunnel   from '../components/WarpTunnel';
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

const TUNNEL_VARIANT = {
  cpu:      'bars',
  globe:    'grid',
  memory:   'rain',
  cards:    'scanlines',
  circuit:  'rings',
  clusters: 'scatter',
  neural:   'wave',
  streams:  'streams',
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
  const dividerRef    = useRef(null);
  const dividerInView = useInView(dividerRef);

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
      {/* Fixed scroll progress bar */}
      <div className="scroll-progress-bar" style={{ height: `${scrollPct}%` }} aria-hidden="true" />

      {/* ══════════ HERO ══════════ */}
      <section id="hero" className="home-container">
        <HeroScene />
        <div className="scanlines" aria-hidden="true" />

        <div className="hero-content" style={{ transform: `translateY(${heroOffset}px)` }}>
          {/* Profile pic fades in as particle name dissolves */}
          <div className="profile-pic-container" style={{ animationDelay: '2.5s' }}>
            <img src="/images/Graduation Pic.png" alt="Nick Petrilli" className="profile-pic" />
          </div>

          {/* Name chars stagger in at 2.8s, cross-fading with particle name */}
          <h1 className="glitch-name" data-text={NAME} aria-label={NAME}>
            {NAME.split('').map((char, i) => (
              <span key={i} className="char-reveal" style={{ animationDelay: `${2.8 + 0.05 * i}s` }}>
                {char === ' ' ? ' ' : char}
              </span>
            ))}
          </h1>

          <h2 className="hero-role" style={{ animationDelay: '3.5s' }}>
            Software Developer<span className="cursor" aria-hidden="true">_</span>
          </h2>

          <p className="hero-bio" style={{ animationDelay: '3.9s' }}>
            MS &amp; BS Computer Science · Marist College · Building innovative web applications
            and tackling challenging problems. Scroll to explore my work.
          </p>

          <div className="scroll-cue" aria-hidden="true" style={{ animationDelay: '4.3s' }}>
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

      {/* ══════════ PROJECT SLIDES + WARP TUNNELS ══════════ */}
      <WarpTunnel
        AnimComponent={ANIM_MAP[projects[0].animKey]}
        nextTitle={projects[0].title}
        variant={TUNNEL_VARIANT[projects[0].animKey]}
      />

      {projects.map((project, idx) => (
        <React.Fragment key={project.id}>
          <ProjectSlide
            project={project}
            index={idx}
            AnimComponent={ANIM_MAP[project.animKey]}
          />
          {idx < projects.length - 1 && (
            <WarpTunnel
              AnimComponent={ANIM_MAP[projects[idx + 1].animKey]}
              nextTitle={projects[idx + 1].title}
              variant={TUNNEL_VARIANT[projects[idx + 1].animKey]}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default Home;
