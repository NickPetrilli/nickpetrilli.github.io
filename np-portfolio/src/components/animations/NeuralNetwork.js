// AI Labs — animated SVG neural network with forward-pass pulse
import React from 'react';

// Layer x positions and node counts
const LAYERS = [
  { x: 40,  nodes: 3 },
  { x: 130, nodes: 5 },
  { x: 210, nodes: 5 },
  { x: 290, nodes: 3 },
];
const H = 230;
const nodeY = (count, i) => H / 2 - ((count - 1) * 36) / 2 + i * 36;

// Build all edges
const edges = [];
LAYERS.forEach((layer, li) => {
  if (li === LAYERS.length - 1) return;
  const next = LAYERS[li + 1];
  for (let a = 0; a < layer.nodes; a++) {
    for (let b = 0; b < next.nodes; b++) {
      edges.push({
        x1: layer.x, y1: nodeY(layer.nodes, a),
        x2: next.x,  y2: nodeY(next.nodes, b),
        delay: (li * 0.3 + a * 0.05 + b * 0.02).toFixed(2),
      });
    }
  }
});

const NeuralNetwork = ({ active }) => (
  <div className={`anim-wrap neural-wrap${active ? ' anim-active' : ''}`}>
    <svg viewBox="0 0 330 230" width="340" height="260">
      {/* Edges */}
      {edges.map((e, i) => {
        const len = Math.hypot(e.x2 - e.x1, e.y2 - e.y1);
        return (
          <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
            stroke="rgba(0,255,0,0.12)" strokeWidth="1" />
        );
      })}

      {/* Animated pulses along edges (only a subset for perf) */}
      {active && edges.filter((_, i) => i % 3 === 0).map((e, i) => (
        <circle key={i} r="3" fill="#00FF00"
          style={{ filter: 'drop-shadow(0 0 4px #00FF00)', opacity: 0.8 }}>
          <animateMotion dur="1.2s" repeatCount="indefinite"
            begin={`${(i * 0.15) % 1.2}s`}>
            <mpath href={`#edge-path-${i}`} />
          </animateMotion>
        </circle>
      ))}
      {edges.filter((_, i) => i % 3 === 0).map((e, i) => (
        <path key={i} id={`edge-path-${i}`}
          d={`M${e.x1},${e.y1} L${e.x2},${e.y2}`} fill="none" />
      ))}

      {/* Nodes */}
      {LAYERS.map((layer, li) =>
        Array.from({ length: layer.nodes }, (_, ni) => {
          const y = nodeY(layer.nodes, ni);
          const isInput  = li === 0;
          const isOutput = li === LAYERS.length - 1;
          const color = isOutput ? '#00FFFF' : '#00FF00';
          return (
            <g key={`${li}-${ni}`}>
              <circle cx={layer.x} cy={y} r={10}
                fill="rgba(0,0,0,0.8)" stroke={color} strokeWidth="2"
                style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
              {isInput && (
                <text x={layer.x} y={y + 4} textAnchor="middle"
                  fill={color} fontSize="8" fontFamily="monospace">x{ni + 1}</text>
              )}
              {isOutput && (
                <text x={layer.x} y={y + 4} textAnchor="middle"
                  fill={color} fontSize="8" fontFamily="monospace">y{ni + 1}</text>
              )}
            </g>
          );
        })
      )}

      {/* Layer labels */}
      {['INPUT', 'HIDDEN', 'HIDDEN', 'OUTPUT'].map((lbl, i) => (
        <text key={i} x={LAYERS[i].x} y={215} textAnchor="middle"
          fill="rgba(0,255,0,0.3)" fontSize="7" fontFamily="'Courier New', monospace"
          letterSpacing="1">
          {lbl}
        </text>
      ))}
    </svg>
    <div className="neural-label">BACKPROPAGATION · GRADIENT DESCENT</div>
  </div>
);

export default NeuralNetwork;
