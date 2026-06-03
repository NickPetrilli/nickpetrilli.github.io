// Charlie — 3D playing cards that fan out and reveal
import React from 'react';

const CARDS = [
  { suit: '♠', val: 'A',  rot: -30, tx: -90, tz: 0,   delay: '0s' },
  { suit: '♥', val: 'K',  rot: -15, tx: -45, tz: 10,  delay: '0.1s', red: true },
  { suit: '♣', val: 'Q',  rot: 0,   tx: 0,   tz: 20,  delay: '0.2s' },
  { suit: '♦', val: 'J',  rot: 15,  tx: 45,  tz: 10,  delay: '0.3s', red: true },
  { suit: '♠', val: '10', rot: 30,  tx: 90,  tz: 0,   delay: '0.4s' },
];

const Card = ({ suit, val, rot, tx, tz, delay, red, active }) => {
  const color = red ? '#ff4444' : '#00FF00';
  return (
    <div
      className="playing-card"
      style={{
        transform: active
          ? `translateX(${tx}px) translateZ(${tz}px) rotateZ(${rot}deg) rotateY(0deg)`
          : `translateX(0) translateZ(0) rotateZ(0deg) rotateY(180deg)`,
        transition: `transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${delay}`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Front */}
      <div className="card-face card-front" style={{ borderColor: color }}>
        <span className="card-corner" style={{ color }}>{val}<br />{suit}</span>
        <span className="card-center" style={{ color, fontSize: val === '10' ? '28px' : '36px' }}>{suit}</span>
        <span className="card-corner card-corner-br" style={{ color }}>{val}<br />{suit}</span>
      </div>
      {/* Back */}
      <div className="card-face card-back">
        <div className="card-back-pattern" />
      </div>
    </div>
  );
};

const CardFan = ({ active }) => (
  <div className={`anim-wrap cards-wrap${active ? ' anim-active' : ''}`}>
    <div className="cards-scene">
      {CARDS.map((c) => <Card key={c.suit + c.val} {...c} active={active} />)}
    </div>
    <div className="cards-label">BASIC STRATEGY</div>
  </div>
);

export default CardFan;
