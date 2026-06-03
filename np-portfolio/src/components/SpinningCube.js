import React from 'react';
import './SpinningCube.css';

const SpinningCube = () => (
  <div className="cube-scene" aria-hidden="true">
    <div className="cube">
      <div className="cube-face cube-front"  />
      <div className="cube-face cube-back"   />
      <div className="cube-face cube-right"  />
      <div className="cube-face cube-left"   />
      <div className="cube-face cube-top"    />
      <div className="cube-face cube-bottom" />
      <div className="cube-core" />
    </div>
    <div className="cube-shadow" />
  </div>
);

export default SpinningCube;
