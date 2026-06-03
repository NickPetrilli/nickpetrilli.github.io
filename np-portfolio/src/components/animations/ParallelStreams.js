// Parallel Processing — single stream splits into 4 parallel threads, merges back
import React from 'react';

const THREADS = [
  { y: 70,  color: '#00FF00', label: 'C++ Threads', dur: '1.6s', delay: '0s'   },
  { y: 105, color: '#00FFFF', label: 'OpenMP',      dur: '1.4s', delay: '0.15s' },
  { y: 140, color: '#00FF00', label: 'MPI',         dur: '1.8s', delay: '0.3s'  },
  { y: 175, color: '#00FFFF', label: 'CUDA',        dur: '1.2s', delay: '0.05s' },
];
const SPLIT_X  = 90;
const MERGE_X  = 230;
const SOURCE_X = 30;
const SINK_X   = 290;
const MID_Y    = 122;

const ParallelStreams = ({ active }) => (
  <div className={`anim-wrap streams-wrap${active ? ' anim-active' : ''}`}>
    <svg viewBox="0 0 330 245" width="340" height="260">

      {/* Source → split */}
      <line x1={SOURCE_X} y1={MID_Y} x2={SPLIT_X} y2={MID_Y}
        stroke="rgba(0,255,0,0.5)" strokeWidth="2.5" strokeLinecap="round" />

      {/* Fan-out lines */}
      {THREADS.map(({ y, color }) => (
        <line key={y}
          x1={SPLIT_X} y1={MID_Y} x2={SPLIT_X + 10} y2={y}
          stroke={color} strokeWidth="1.5" opacity="0.4" />
      ))}

      {/* Parallel thread tracks */}
      {THREADS.map(({ y, color }) => (
        <line key={y}
          x1={SPLIT_X + 10} y1={y} x2={MERGE_X - 10} y2={y}
          stroke={color} strokeWidth="1.5" opacity="0.2" />
      ))}

      {/* Fan-in lines */}
      {THREADS.map(({ y, color }) => (
        <line key={y}
          x1={MERGE_X - 10} y1={y} x2={MERGE_X} y2={MID_Y}
          stroke={color} strokeWidth="1.5" opacity="0.4" />
      ))}

      {/* Merge → sink */}
      <line x1={MERGE_X} y1={MID_Y} x2={SINK_X} y2={MID_Y}
        stroke="rgba(0,255,0,0.5)" strokeWidth="2.5" strokeLinecap="round" />

      {/* Animated pulses per thread */}
      {active && THREADS.map(({ y, color, dur, delay }, i) => (
        <circle key={i} r="5" fill={color}
          style={{ filter: `drop-shadow(0 0 5px ${color})` }}>
          <animateMotion dur={dur} repeatCount="indefinite" begin={delay}>
            <mpath href={`#stream-path-${i}`} />
          </animateMotion>
        </circle>
      ))}

      {/* Motion paths */}
      {THREADS.map(({ y }, i) => (
        <path key={i} id={`stream-path-${i}`}
          d={`M${SOURCE_X},${MID_Y} L${SPLIT_X},${MID_Y} L${SPLIT_X+10},${y} L${MERGE_X-10},${y} L${MERGE_X},${MID_Y} L${SINK_X},${MID_Y}`}
          fill="none" />
      ))}

      {/* Source/sink dots */}
      <circle cx={SOURCE_X} cy={MID_Y} r={6} fill="#00FF00"
        style={{ filter: 'drop-shadow(0 0 6px #00FF00)' }} />
      <circle cx={SINK_X} cy={MID_Y} r={6} fill="#00FF00"
        style={{ filter: 'drop-shadow(0 0 6px #00FF00)' }} />

      {/* Thread labels */}
      {THREADS.map(({ y, color, label }) => (
        <text key={y} x={SPLIT_X + 16} y={y + 4}
          fill={color} fontSize="8" fontFamily="'Courier New', monospace"
          opacity="0.7">{label}</text>
      ))}

      {/* Split / merge markers */}
      <text x={SPLIT_X} y={MID_Y + 20} textAnchor="middle"
        fill="rgba(0,255,0,0.3)" fontSize="7" fontFamily="monospace">SPLIT</text>
      <text x={MERGE_X} y={MID_Y + 20} textAnchor="middle"
        fill="rgba(0,255,0,0.3)" fontSize="7" fontFamily="monospace">MERGE</text>
    </svg>
    <div className="streams-label">PARALLEL EXECUTION</div>
  </div>
);

export default ParallelStreams;
