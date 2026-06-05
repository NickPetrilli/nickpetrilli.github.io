// Covid-19 — dot groups that pool, split, and isolate (pooled testing algorithm)
import React from 'react';

// 3 pools of 8 dots each
const POOLS = [
  { cx: 80,  cy: 115, infected: [1, 5] },
  { cx: 150, cy: 115, infected: [] },
  { cx: 220, cy: 115, infected: [2] },
];

const DOT_OFFSETS = [
  [-18,-18],[ 0,-22],[18,-18],
  [-22,  0],          [22,  0],
  [-18, 18],[ 0, 22],[18, 18],
];

const DotClusters = ({ active }) => (
  <div className={`anim-wrap clusters-wrap${active ? ' anim-active' : ''}`}>
    <svg viewBox="0 0 300 230" width="320" height="260">

      {/* Pool group borders */}
      {POOLS.map(({ cx, cy, infected }, pi) => (
        <g key={pi}>
          <circle cx={cx} cy={cy} r={40}
            fill="none" stroke="rgba(0,255,0,0.15)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={cx} y={cy + 56} textAnchor="middle"
            fill="rgba(0,255,0,0.35)" fontSize="8" fontFamily="'Courier New', monospace">
            POOL {pi + 1}
          </text>

          {/* 8 dots per pool */}
          {DOT_OFFSETS.map(([dx, dy], di) => {
            const isInfected = infected.includes(di);
            const color = isInfected ? '#ff4444' : '#00FF00';
            const shadow = isInfected ? 'rgba(255,68,68,0.7)' : 'rgba(0,255,0,0.7)';
            return (
              <circle key={di}
                cx={cx + dx} cy={cy + dy} r={5}
                fill={color}
                style={{
                  filter: `drop-shadow(0 0 4px ${shadow})`,
                  opacity: active ? 1 : 0,
                  transition: `opacity 0.4s ease ${0.1 * di + 0.3 * pi}s`,
                }}
              />
            );
          })}
        </g>
      ))}

      {/* Infection key */}
      <circle cx="68" cy="195" r="5" fill="#ff4444"
        style={{ filter: 'drop-shadow(0 0 4px rgba(255,68,68,0.7))' }} />
      <text x="78" y="199" fill="rgba(255,68,68,0.7)"
        fontSize="9" fontFamily="'Courier New', monospace">INFECTED</text>

      <circle cx="145" cy="195" r="5" fill="#00FF00"
        style={{ filter: 'drop-shadow(0 0 4px rgba(0,255,0,0.7))' }} />
      <text x="155" y="199" fill="rgba(0,255,0,0.7)"
        fontSize="9" fontFamily="'Courier New', monospace">HEALTHY</text>

      {/* Animated scan line sweeping down */}
      {active && (
        <line x1="30" y1="0" x2="30" y2="230"
          stroke="rgba(0,255,255,0.4)" strokeWidth="1">
          <animateTransform attributeName="transform" type="translate"
            from="0,0" to="240,0" dur="3s" repeatCount="indefinite" />
        </line>
      )}
    </svg>
    <div className="clusters-label">POOLED TESTING ALGORITHM</div>
  </div>
);

export default DotClusters;
