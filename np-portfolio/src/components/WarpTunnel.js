import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import './WarpTunnel.css';

/* ── Variant background components ── */

const GridBg = () => (
  <div className="tvar tvar-grid" aria-hidden="true">
    <div className="tvar-grid-floor" />
    <div className="tvar-grid-ceil" />
  </div>
);

const RAIN_CHARS = '0123456789ABCDEF';
const RainBg = () => {
  const cols = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    left: (i / 24) * 100,
    delay:    (Math.sin(i * 7.3)  * 0.5 + 0.5) * 2.2,
    duration: 1.3 + (Math.sin(i * 3.1) * 0.5 + 0.5) * 1.8,
    chars: Array.from({ length: 16 }, (__, j) =>
      RAIN_CHARS[Math.floor((Math.sin(i * 13 + j * 7) * 0.5 + 0.5) * 16)]
    ),
  })), []);

  return (
    <div className="tvar tvar-rain" aria-hidden="true">
      {cols.map((col, i) => (
        <div key={i} className="tvar-rain-col" style={{
          left: `${col.left}%`,
          animationDelay:    `${col.delay}s`,
          animationDuration: `${col.duration}s`,
        }}>
          {col.chars.map((ch, j) => <span key={j}>{ch}</span>)}
        </div>
      ))}
    </div>
  );
};

const ScanlinesBg = () => (
  <div className="tvar tvar-scanlines" aria-hidden="true">
    {Array.from({ length: 10 }, (_, i) => (
      <div key={i} className="tvar-scanline" style={{ animationDelay: `${i * 0.32}s` }} />
    ))}
  </div>
);

const RingsBg = () => (
  <div className="tvar tvar-rings" aria-hidden="true">
    {Array.from({ length: 12 }, (_, i) => (
      <div key={i} className="tvar-ring" style={{ animationDelay: `${-(i / 12) * 2.8}s` }} />
    ))}
  </div>
);

const ScatterBg = () => (
  <div className="tvar tvar-scatter" aria-hidden="true">
    {Array.from({ length: 40 }, (_, i) => (
      <div key={i} className="tvar-scatter-dot" style={{
        '--angle': `${(i / 40) * 360}deg`,
        animationDelay: `${(i % 10) * 0.16}s`,
      }} />
    ))}
  </div>
);

const WaveBg = () => (
  <div className="tvar tvar-wave" aria-hidden="true">
    {Array.from({ length: 7 }, (_, i) => (
      <div key={i} className="tvar-wave-ring" style={{ animationDelay: `${i * 0.52}s` }} />
    ))}
  </div>
);

const BarsBg = () => (
  <div className="tvar tvar-bars" aria-hidden="true">
    {Array.from({ length: 22 }, (_, i) => (
      <div
        key={i}
        className="tvar-bar"
        style={{
          left:              `${(i / 22) * 100}%`,
          animationDelay:    `${(Math.sin(i * 2.3) * 0.5 + 0.5) * 1.4}s`,
          animationDuration: `${0.7 + (Math.sin(i * 1.7) * 0.5 + 0.5) * 1.1}s`,
        }}
      />
    ))}
  </div>
);

const StreamsBg = () => (
  <div className="tvar tvar-streams" aria-hidden="true">
    {Array.from({ length: 16 }, (_, i) => (
      <div key={i} className="tvar-stream" style={{
        top:               `${(i / 16) * 100 + 3}%`,
        animationDuration: `${0.8 + (i % 5) * 0.22}s`,
        animationDelay:    `${-(i * 0.09)}s`,
        opacity:            0.22 + (i % 4) * 0.13,
        width:             `${25 + (i % 5) * 18}%`,
      }} />
    ))}
  </div>
);

const VARIANT_BG = {
  bars:      <BarsBg />,
  grid:      <GridBg />,
  rain:      <RainBg />,
  scanlines: <ScanlinesBg />,
  rings:     <RingsBg />,
  scatter:   <ScatterBg />,
  wave:      <WaveBg />,
  streams:   <StreamsBg />,
};

/* ── Main WarpTunnel ── */
const WarpTunnel = ({ AnimComponent, nextTitle, variant = 'rings' }) => {
  const sectionRef = useRef(null);
  const animRef    = useRef(null);
  const labelRef   = useRef(null);

  const tick = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1,
      (window.innerHeight - rect.top) / (rect.height + window.innerHeight)
    ));

    if (animRef.current) {
      // Reach max size by progress=0.5 (centered in viewport), hold large through exit
      const growPct = Math.min(progress / 0.5, 1);
      const scale   = 0.2 + growPct * 2.4;
      // Fade in fast, fade out gently in the last 15% so the cut to the next slide isn't jarring
      const opacity = progress > 0.85
        ? Math.max(0, 1 - (progress - 0.85) / 0.15)
        : Math.min(1, progress * 3.5);
      animRef.current.style.transform = `scale(${scale.toFixed(3)})`;
      animRef.current.style.opacity   = opacity.toFixed(3);
    }

    if (labelRef.current) {
      const p = progress < 0.5 ? 0 : Math.min(1, (progress - 0.5) / 0.22);
      labelRef.current.style.opacity = p.toFixed(3);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, [tick]);

  return (
    <div ref={sectionRef} className={`warp-tunnel warp-${variant}`}>
      {VARIANT_BG[variant] ?? <RingsBg />}

      <div className="warp-glow" aria-hidden="true" />

      <div
        ref={animRef}
        className="warp-anim"
        style={{ opacity: 0, transform: 'scale(0.2)' }}
      >
        <AnimComponent active />
      </div>

      <div ref={labelRef} className="warp-label" style={{ opacity: 0 }} aria-hidden="true">
        <span className="wl-prefix">{'>'}</span>
        {' LOADING: '}
        <span className="wl-title">{nextTitle.toUpperCase()}</span>
        <span className="wl-cursor">_</span>
      </div>
    </div>
  );
};

export default WarpTunnel;
