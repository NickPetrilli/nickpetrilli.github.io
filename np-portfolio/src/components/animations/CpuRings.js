// SysMon+ — animated SVG progress rings (CPU / Memory / Disk)
import React from 'react';

const TAU = 2 * Math.PI;
const arc = (r, pct) => `${TAU * r * pct} ${TAU * r * (1 - pct)}`;
const offset = (r) => TAU * r * 0.25; // start at top

const CpuRings = ({ active }) => (
  <div className={`anim-wrap cpu-wrap${active ? ' anim-active' : ''}`}>
    <svg viewBox="0 0 220 220" width="260" height="260" overflow="visible">
      {/* Tracks */}
      {[90, 66, 42].map((r) => (
        <circle key={r} cx="110" cy="110" r={r} fill="none"
          stroke="rgba(0,255,0,0.08)" strokeWidth="10" />
      ))}

      {/* CPU — 78% green */}
      <circle cx="110" cy="110" r={90} fill="none"
        stroke="#00FF00" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={arc(90, 0.78)} strokeDashoffset={offset(90)}
        className="ring-arc ring-cpu"
        style={{ filter: 'drop-shadow(0 0 6px #00FF00)' }} />

      {/* Memory — 45% cyan */}
      <circle cx="110" cy="110" r={66} fill="none"
        stroke="#00FFFF" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={arc(66, 0.45)} strokeDashoffset={offset(66)}
        className="ring-arc ring-mem"
        style={{ filter: 'drop-shadow(0 0 5px #00FFFF)' }} />

      {/* Disk — 23% dim green */}
      <circle cx="110" cy="110" r={42} fill="none"
        stroke="rgba(0,255,0,0.55)" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={arc(42, 0.23)} strokeDashoffset={offset(42)}
        className="ring-arc ring-dsk" />

      {/* Center text */}
      <text x="110" y="105" textAnchor="middle" fill="#00FF00"
        fontSize="16" fontFamily="'Courier New', monospace" fontWeight="bold">SYS</text>
      <text x="110" y="122" textAnchor="middle" fill="rgba(0,255,0,0.4)"
        fontSize="8" fontFamily="'Courier New', monospace" letterSpacing="3">MONITOR</text>
    </svg>

    {/* Floating metric badges */}
    <div className="cpu-badge" style={{ top: '8%', right: '6%' }}>
      <span className="badge-key">CPU</span><span className="badge-val">78%</span>
    </div>
    <div className="cpu-badge" style={{ top: '44%', right: '0%' }}>
      <span className="badge-key">MEM</span><span className="badge-val">45%</span>
    </div>
    <div className="cpu-badge" style={{ bottom: '8%', right: '6%' }}>
      <span className="badge-key">DSK</span><span className="badge-val">23%</span>
    </div>
  </div>
);

export default CpuRings;
