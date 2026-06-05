// tsiraM-6502 — SVG circuit board with animated signal pulses
import React from 'react';

// Circuit traces: [x1,y1,x2,y2]
const TRACES = [
  [20,  80,  100, 80],  [100, 80,  100, 50],  [100, 50,  200, 50],
  [20,  130, 100, 130], [100, 130, 100, 180], [100, 180, 200, 180],
  [280, 80,  200, 80],  [200, 80,  200, 50],
  [280, 130, 200, 130], [200, 130, 200, 180],
  [20,  115, 60,  115], [60,  115, 60,  200], [60,  200, 200, 200],
  [280, 115, 240, 115], [240, 115, 240, 30],  [240, 30,  150, 30],
  [150, 30,  150, 50],
];

// Pulses: trace index, color, delay
const PULSES = [
  { t: 0,  color: '#00FF00', delay: 0    },
  { t: 3,  color: '#00FFFF', delay: 0.4  },
  { t: 6,  color: '#00FF00', delay: 0.8  },
  { t: 8,  color: '#00FFFF', delay: 1.2  },
  { t: 12, color: '#00FF00', delay: 0.6  },
  { t: 13, color: '#00FFFF', delay: 1.0  },
];

const traceLen = ([x1,y1,x2,y2]) => Math.hypot(x2-x1, y2-y1);

const CircuitBoard = ({ active }) => (
  <div className={`anim-wrap circuit-wrap${active ? ' anim-active' : ''}`}>
    <svg viewBox="0 0 300 230" width="340" height="260">
      {/* Traces */}
      {TRACES.map((t, i) => (
        <line key={i} x1={t[0]} y1={t[1]} x2={t[2]} y2={t[3]}
          stroke="rgba(0,255,0,0.18)" strokeWidth="2" strokeLinecap="round" />
      ))}

      {/* Animated pulses */}
      {active && PULSES.map(({ t, color, delay }, i) => {
        const [x1,y1,x2,y2] = TRACES[t];
        const len = traceLen(TRACES[t]);
        return (
          <circle key={i} r="4" fill={color}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
            <animateMotion dur="1.4s" repeatCount="indefinite" begin={`${delay}s`}>
              <mpath href={`#trace-${t}`} />
            </animateMotion>
          </circle>
        );
      })}

      {/* Invisible paths for motion */}
      {TRACES.map((t, i) => (
        <path key={i} id={`trace-${i}`}
          d={`M${t[0]},${t[1]} L${t[2]},${t[3]}`} fill="none" />
      ))}

      {/* CPU core */}
      <rect x="100" y="50" width="100" height="130" rx="4"
        fill="rgba(0,255,0,0.04)" stroke="#00FF00" strokeWidth="2"
        style={{ filter: 'drop-shadow(0 0 8px rgba(0,255,0,0.4))' }} />
      <text x="150" y="108" textAnchor="middle" fill="#00FF00"
        fontFamily="'Courier New', monospace" fontSize="13" fontWeight="bold">6502</text>
      <text x="150" y="124" textAnchor="middle" fill="rgba(0,255,0,0.5)"
        fontFamily="'Courier New', monospace" fontSize="8" letterSpacing="2">CPU</text>

      {/* Corner solder points */}
      {[[20,80],[20,115],[20,130],[280,80],[280,115],[280,130],[60,200],[240,30]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="4"
          fill="rgba(0,255,0,0.15)" stroke="#00FF00" strokeWidth="1" />
      ))}
    </svg>
    <div className="circuit-label">FETCH · DECODE · EXECUTE</div>
  </div>
);

export default CircuitBoard;
