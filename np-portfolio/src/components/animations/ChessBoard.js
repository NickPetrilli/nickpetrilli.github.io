// Checked Out — chess engine analysis board
import React from 'react';

const SQ    = 30;           // px per square
const BOARD = SQ * 8;       // 240

// [col, row, symbol, isWhite]  — col 0=a, row 0=rank8
const PIECES = [
  [6, 0, '♚', false],   // black king   g8
  [1, 1, '♜', false],   // black rook   b7
  [3, 2, '♟', false],   // black pawn   d6
  [5, 2, '♞', false],   // black knight f6
  [5, 3, '♟', false],   // black pawn   f5
  [2, 4, '♙', true ],   // white pawn   c4
  [2, 5, '♘', true ],   // white knight c3
  [5, 6, '♕', true ],   // white queen  f2
  [4, 7, '♔', true ],   // white king   e1
  [7, 7, '♖', true ],   // white rook   h1
];

// Squares that pulse to simulate engine candidate-move scanning
const HIGHLIGHTS = [
  { col: 4, row: 4, delay: 0    },   // e4  — knight landing
  { col: 3, row: 3, delay: 0.32 },   // d5
  { col: 1, row: 3, delay: 0.64 },   // b5
  { col: 0, row: 4, delay: 0.96 },   // a4
  { col: 4, row: 6, delay: 1.28 },   // e3
  { col: 3, row: 7, delay: 1.60 },   // d1
];

// Best-move arrow: Nc3 → e4 (valid knight jump: +2 col, −1 row)
const FROM = [2, 5];
const TO   = [4, 4];

const sq  = (col, row) => ({ x: col * SQ + SQ / 2, y: row * SQ + SQ / 2 });

const ChessBoard = ({ active }) => {
  const from = sq(FROM[0], FROM[1]);
  const to   = sq(TO[0],   TO[1]);

  return (
    <div className={`anim-wrap chess-wrap${active ? ' anim-active' : ''}`}>
      <svg viewBox={`0 0 ${BOARD} ${BOARD}`} width="260" height="260">

        {/* ── Board squares ── */}
        {Array.from({ length: 64 }, (_, i) => {
          const col   = i % 8;
          const row   = Math.floor(i / 8);
          const light = (col + row) % 2 === 0;
          return (
            <rect key={i}
              x={col * SQ} y={row * SQ}
              width={SQ} height={SQ}
              fill={light ? 'rgba(0,255,0,0.055)' : 'rgba(0,0,0,0.55)'}
            />
          );
        })}

        {/* ── Subtle grid lines ── */}
        {Array.from({ length: 7 }, (_, i) => (
          <React.Fragment key={i}>
            <line x1={(i+1)*SQ} y1={0}     x2={(i+1)*SQ} y2={BOARD}
              stroke="rgba(0,255,0,0.1)" strokeWidth="0.5" />
            <line x1={0}        y1={(i+1)*SQ} x2={BOARD}  y2={(i+1)*SQ}
              stroke="rgba(0,255,0,0.1)" strokeWidth="0.5" />
          </React.Fragment>
        ))}

        {/* ── Analysis highlights ── */}
        {HIGHLIGHTS.map(({ col, row, delay }, i) => (
          <rect key={i}
            x={col * SQ + 2} y={row * SQ + 2}
            width={SQ - 4} height={SQ - 4}
            fill="rgba(0,255,0,0.1)"
            stroke="#00FF00" strokeWidth="1.5"
            className="chess-sq-flash"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}

        {/* ── Best-move arrow ── */}
        {active && (
          <>
            <defs>
              <marker id="chess-arrowhead"
                markerWidth="5" markerHeight="5"
                refX="4" refY="2.5" orient="auto">
                <polygon points="0,0 5,2.5 0,5"
                  fill="#00FFFF" opacity="0.9" />
              </marker>
            </defs>
            <line
              className="chess-move-arrow"
              x1={from.x} y1={from.y}
              x2={to.x}   y2={to.y}
              stroke="#00FFFF" strokeWidth="2.5"
              strokeLinecap="round"
              markerEnd="url(#chess-arrowhead)"
            />
          </>
        )}

        {/* ── Pieces ── */}
        {PIECES.map(([col, row, symbol, isWhite], i) => (
          <text key={i}
            x={col * SQ + SQ / 2}
            y={row * SQ + SQ / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="20"
            fontFamily="serif"
            fill={isWhite ? '#00FF00' : '#00CCFF'}
            style={{
              filter: isWhite
                ? 'drop-shadow(0 0 5px rgba(0,255,0,0.9))'
                : 'drop-shadow(0 0 5px rgba(0,200,255,0.8))',
              userSelect: 'none',
            }}
          >
            {symbol}
          </text>
        ))}

        {/* ── Board border ── */}
        <rect x={0} y={0} width={BOARD} height={BOARD}
          fill="none" stroke="#00FF00" strokeWidth="1.5"
          style={{ filter: 'drop-shadow(0 0 8px rgba(0,255,0,0.45))' }}
        />

      </svg>
      <div className="chess-label">ENGINE · ANALYSIS</div>
    </div>
  );
};

export default ChessBoard;
