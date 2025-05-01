"use client";
import React, { useState, useEffect } from 'react';

interface GameBoardProps {
  onAttempt: () => void;
  onComplete: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ onAttempt, onComplete }) => {
  const [grid, setGrid] = useState<number[][]>(Array(6).fill(Array(6).fill(0)));

  // Grid cell component
  const Cell: React.FC<{ value: number }> = ({ value }) => (
    <div 
      className={`
        aspect-square border border-white/20
        ${value ? 'bg-white/20' : 'bg-transparent'}
        transition-all duration-200 hover:bg-white/10
      `}
    />
  );

  return (
    <div className="w-full h-full grid grid-cols-6 gap-1 p-1">
      {grid.map((row, i) => (
        row.map((cell, j) => (
          <Cell key={`${i}-${j}`} value={cell} />
        ))
      ))}
    </div>
  );
};

export default GameBoard; 