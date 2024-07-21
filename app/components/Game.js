"use client"

// components/Game.js
import React, { useState, useCallback, useEffect } from 'react';
import { createGrid, getNextState, cloneGrid } from '../lib/gameOfLife';

const numRows = 30;
const numCols = 30;

const Game = () => {
  const [grid, setGrid] = useState(() => createGrid(numRows, numCols));
  const [running, setRunning] = useState(false);

  const runSimulation = useCallback(() => {
    if (!running) return;

    setGrid((g) => getNextState(g));
    setTimeout(runSimulation, 100);
  }, [running]);

  const toggleCellState = (row, col) => {
    const newGrid = cloneGrid(grid);
    newGrid[row][col] = grid[row][col] ? 0 : 1;
    setGrid(newGrid);
  };

  const handleRandomize = () => {
    const newGrid = createGrid(numRows, numCols);
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        newGrid[i][j] = Math.random() > 0.7 ? 1 : 0;
      }
    }
    setGrid(newGrid);
  };

  useEffect(() => {
    if (running) {
      runSimulation();
    }
  }, [running, runSimulation]);

  return (
    <div>
      <button onClick={() => setRunning(!running)}>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={handleRandomize}>
        Randomize
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 25px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => toggleCellState(i, j)}
              style={{
                width: 25,
                height: 25,
                backgroundColor: grid[i][j] ? 'black' : undefined,
                border: 'solid 1px gray',
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Game;