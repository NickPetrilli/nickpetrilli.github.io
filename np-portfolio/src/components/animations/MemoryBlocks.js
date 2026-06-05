// NickOS — floating 3D memory allocation blocks
import React from 'react';

const BLOCKS = [
  { label: 'KERNEL', color: '#00FF00', size: 72, x: 0,   y: -60,  delay: '0s',    dur: '3.2s' },
  { label: 'PROC',   color: '#00FFFF', size: 54, x: -70, y: 10,   delay: '0.4s',  dur: '2.8s' },
  { label: 'MEM',    color: '#00FF00', size: 54, x: 70,  y: 10,   delay: '0.8s',  dur: '3.5s' },
  { label: 'I/O',    color: '#00FF00', size: 44, x: -40, y: 72,   delay: '0.2s',  dur: '4s'   },
  { label: 'FS',     color: '#00FFFF', size: 44, x: 50,  y: 72,   delay: '0.6s',  dur: '2.5s' },
];

const Face = ({ size, color, style }) => (
  <div style={{
    position: 'absolute', width: size, height: size,
    border: `1px solid ${color}`,
    background: `rgba(${color === '#00FFFF' ? '0,255,255' : '0,255,0'},0.04)`,
    ...style,
  }} />
);

const Block = ({ label, color, size, x, y, delay, dur }) => (
  <div style={{
    position: 'absolute',
    width: size, height: size,
    left: `calc(50% + ${x}px - ${size / 2}px)`,
    top:  `calc(50% + ${y}px - ${size / 2}px)`,
    transformStyle: 'preserve-3d',
    animation: `mem-float ${dur} ease-in-out infinite`,
    animationDelay: delay,
  }}>
    {/* 6 faces */}
    <Face size={size} color={color} style={{ transform: `translateZ(${size / 2}px)` }} />
    <Face size={size} color={color} style={{ transform: `rotateY(180deg) translateZ(${size / 2}px)` }} />
    <Face size={size} color={color} style={{ transform: `rotateY(90deg) translateZ(${size / 2}px)` }} />
    <Face size={size} color={color} style={{ transform: `rotateY(-90deg) translateZ(${size / 2}px)` }} />
    <Face size={size} color={color} style={{ transform: `rotateX(90deg) translateZ(${size / 2}px)` }} />
    <Face size={size} color={color} style={{ transform: `rotateX(-90deg) translateZ(${size / 2}px)` }} />
    {/* Label on front face */}
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transform: `translateZ(${size / 2 + 1}px)`,
      color, fontFamily: 'Courier New', fontSize: size > 60 ? '11px' : '9px',
      letterSpacing: '2px', fontWeight: 'bold',
      textShadow: `0 0 8px ${color}`,
    }}>
      {label}
    </div>
  </div>
);

const MemoryBlocks = ({ active }) => (
  <div className={`anim-wrap memory-wrap${active ? ' anim-active' : ''}`}>
    <div className="memory-scene">
      {BLOCKS.map((b) => <Block key={b.label} {...b} />)}
    </div>
    <div className="memory-label">MEMORY ALLOCATION</div>
  </div>
);

export default MemoryBlocks;
