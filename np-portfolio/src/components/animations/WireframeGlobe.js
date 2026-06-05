// FoxLift — CSS 3D wireframe spinning globe with orbiting location dot
import React from 'react';

const MERIDIANS = 9;   // longitude lines
const PARALLELS = [30, 60, -30, -60]; // latitude angles

const WireframeGlobe = ({ active }) => (
  <div className={`anim-wrap globe-wrap${active ? ' anim-active' : ''}`}>
    <div className="globe-scene">
      <div className="globe">
        {/* Meridian rings (longitude) */}
        {Array.from({ length: MERIDIANS }, (_, i) => (
          <div key={i} className="meridian"
            style={{ transform: `rotateY(${i * (180 / MERIDIANS)}deg)` }} />
        ))}
        {/* Equator */}
        <div className="parallel equator" />
        {/* Latitude parallels */}
        {PARALLELS.map((deg) => {
          const scale = Math.cos((deg * Math.PI) / 180);
          const yPct  = 50 - Math.sin((deg * Math.PI) / 180) * 50;
          return (
            <div key={deg} className="parallel"
              style={{ transform: `translateY(-50%) scaleX(${scale})`, top: `${yPct}%` }} />
          );
        })}
        {/* Orbiting location dot */}
        <div className="globe-orbit">
          <div className="globe-dot" />
        </div>
      </div>
    </div>
    <div className="globe-label">GOOGLE MAPS API</div>
  </div>
);

export default WireframeGlobe;
