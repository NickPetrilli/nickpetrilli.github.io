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

  /* ── Digital rain ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const CHARS = '01';

    const dpr = window.devicePixelRatio || 1;
    const cssW = () => window.innerWidth;
    const cssH = () => window.innerHeight;

    const resize = () => {
      canvas.width  = cssW() * dpr;
      canvas.height = cssH() * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const buildColumns = () => {
      const cols = [];
      let x = 0;
      while (x < cssW()) {
        const size  = 11 + Math.floor(Math.random() * 7);
        const speed = 0.4 + Math.random() * 0.9;
        const alpha = 0.25 + Math.random() * 0.55;
        cols.push({
          x,
          y:     Math.random() * -cssH(),
          size,
          speed,
          alpha,
          gap:   size * 1.1,
        });
        x += size * 1.35;
      }
      return cols;
    };

    let columns  = buildColumns();
    let lastTime = 0, animId;

    const draw = (ts) => {
      animId = requestAnimationFrame(draw);
      if (ts - lastTime < 16) return;
      lastTime = ts;

      // Soft fade trail
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, cssW(), cssH());

      for (const col of columns) {
        col.y += col.speed;
        if (col.y > cssH() + col.size * 2) {
          col.y = -col.size * (5 + Math.random() * 20);
        }

        const steps = Math.ceil(cssH() / col.gap) + 2;
        for (let s = 0; s < steps; s++) {
          const cy = col.y + s * col.gap;
          if (cy < -col.size || cy > cssH() + col.size) continue;

          const isHead  = s === 0;
          const ageFade = Math.max(0, 1 - s / 18);
          const char    = CHARS[Math.random() > 0.5 ? 1 : 0];

          ctx.shadowBlur = 0;
          ctx.font       = `${col.size}px "Courier New", monospace`;

          if (isHead) {
            ctx.fillStyle = `rgba(180,255,190,${col.alpha})`;
          } else {
            ctx.fillStyle = `rgba(0,255,0,${col.alpha * ageFade * 0.85})`;
          }

          ctx.fillText(char, col.x, cy);
        }
      }
    };

    animId = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      columns = buildColumns();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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
