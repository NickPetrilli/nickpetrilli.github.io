import React, { useState, useEffect, useRef } from 'react';
import './LoadingScreen.css';

const BOOT_LINES = [
  { text: 'BIOS v2.4.1 — NP SYSTEMS',            delay: 0    },
  { text: 'Initializing hardware...',              delay: 400  },
  { text: 'Loading kernel modules............[OK]', delay: 850  },
  { text: 'Mounting file systems...............[OK]', delay: 1300 },
  { text: 'Establishing neural link............[OK]', delay: 1750 },
  { text: 'Decrypting portfolio data...........[OK]', delay: 2150 },
  { text: 'Launching NP://PORTFOLIO.EXE',           delay: 2550 },
  { text: '> SYSTEM READY',                         delay: 2900, accent: true },
];

const TOTAL_MS   = 4200; // App.js loading duration
const FADEOUT_MS = 3600; // when fade-out begins

const LoadingScreen = () => {
  const canvasRef  = useRef(null);
  const [lines,    setLines]    = useState([]);
  const [exiting,  setExiting]  = useState(false);
  const [progress, setProgress] = useState(0);

  /* ── Matrix rain ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx      = canvas.getContext('2d');
    const fontSize = 14;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    let columns = Math.floor(canvas.width / fontSize);
    let drops   = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));
    let lastTime = 0, animId;

    const draw = (ts) => {
      animId = requestAnimationFrame(draw);
      if (ts - lastTime < 50) return; // ~20fps
      lastTime = ts;
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.length; i++) {
        const y = drops[i] * fontSize;
        if (y < 0) { drops[i]++; continue; }
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
        ctx.fillText(Math.random() > 0.5 ? '1' : '0', i * fontSize, y);
        if (drops[i] > 1) {
          ctx.fillStyle = '#00ff41';
          ctx.font = `${fontSize}px 'Courier New', monospace`;
          ctx.fillText(Math.random() > 0.5 ? '1' : '0', i * fontSize, (drops[i] - 1) * fontSize);
        }
        if (y > canvas.height && Math.random() > 0.975) drops[i] = Math.floor(Math.random() * -20);
        drops[i]++;
      }
    };
    animId = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      columns = Math.floor(canvas.width / fontSize);
      drops   = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  /* ── Boot lines typewriter ── */
  useEffect(() => {
    const timers = BOOT_LINES.map(({ delay }, idx) =>
      setTimeout(() => setLines(prev => [...prev, idx]), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  /* ── Progress bar (smooth rAF) ── */
  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const pct = Math.min(((now - start) / FADEOUT_MS) * 100, 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── Fade-out trigger ── */
  useEffect(() => {
    const t = setTimeout(() => setExiting(true), FADEOUT_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`ls-overlay${exiting ? ' ls-exiting' : ''}`}>
      <canvas ref={canvasRef} className="ls-canvas" />

      <div className="ls-terminal">
        {/* Title bar */}
        <div className="ls-titlebar">
          <div className="ls-dots">
            <span className="ls-dot ls-dot-red"   />
            <span className="ls-dot ls-dot-yellow"/>
            <span className="ls-dot ls-dot-green" />
          </div>
          <span className="ls-titlebar-text">NP://BOOT — terminal</span>
        </div>

        {/* Boot log */}
        <div className="ls-body">
          <div className="ls-logo">NP<span className="ls-logo-sep">//</span></div>

          <div className="ls-log">
            {BOOT_LINES.map((line, idx) =>
              lines.includes(idx) ? (
                <p key={idx} className={`ls-line${line.accent ? ' ls-accent' : ''}`}>
                  {line.text}
                  {idx === lines[lines.length - 1] && (
                    <span className="ls-blink-cursor">▋</span>
                  )}
                </p>
              ) : null
            )}
          </div>

          {/* Progress bar */}
          <div className="ls-bar-wrap">
            <div className="ls-bar-track">
              <div className="ls-bar-fill" style={{ width: `${progress}%` }}>
                <div className="ls-bar-shimmer" />
              </div>
            </div>
            <span className="ls-bar-pct">{Math.floor(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
