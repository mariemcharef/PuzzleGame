import React, { useState, useEffect, useCallback } from 'react';
import type { BlockType } from './models/types/blocktype';
import type { CellValue } from './models/types/cellvalue';
import type { Piece } from './models/classes/piece';
import { TetrominoFactory } from './models/classes/tetrominoFactory';
import { MoveCommand } from './models/classes/command';
import { LandedState } from './models/classes/pieceState';
import { RotateCommand } from './models/classes/rotateCommand';

const TetrisGame: React.FC = () => {
  const [grid, setGrid] = useState<CellValue[][]>(() => 
    Array(20).fill(null).map(() => Array(10).fill(null))
  );
  const [currentPiece, setCurrentPiece] = useState<Piece>(() => TetrominoFactory.createPiece());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const checkCollision = useCallback((piece: Piece): boolean => {
    return piece.getAbsoluteBlocks().some(b => 
      b.x < 0 || b.x >= 10 || b.y >= 20 || 
      (b.y >= 0 && grid[b.y]?.[b.x] !== null)
    );
  }, [grid]);

  const lockPiece = useCallback(() => {
    const newGrid = grid.map(row => [...row]);
    currentPiece.getAbsoluteBlocks().forEach(b => {
      if (b.y >= 0 && b.y < 20) {
        newGrid[b.y][b.x] = currentPiece.type;
      }
    });

    let linesCleared = 0;
    for (let y = 19; y >= 0; y--) {
      if (newGrid[y].every(cell => cell !== null)) {
        newGrid.splice(y, 1);
        newGrid.unshift(Array(10).fill(null));
        linesCleared++;
        y++;
      }
    }

    setGrid(newGrid);
    setScore(s => s + linesCleared * 100);

    const newPiece = TetrominoFactory.createPiece();
    if (checkCollision(newPiece)) {
      setGameOver(true);
    } else {
      setCurrentPiece(newPiece);
    }
  }, [grid, currentPiece, checkCollision]);

  const moveDown = useCallback(() => {
   const cmd = new MoveCommand(currentPiece, 0, 1, grid, setCurrentPiece);

    if (cmd.canExecute()) {
          cmd.execute();

    } else {
      currentPiece.setState(new LandedState());
      lockPiece();
    }
  }, [currentPiece, grid, lockPiece]);

  useEffect(() => {
    if (gameOver || isPaused) return;
    const interval = setInterval(moveDown, 500);
    return () => clearInterval(interval);
  }, [moveDown, gameOver, isPaused]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver || isPaused) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          new MoveCommand(currentPiece, -1, 0, grid, setCurrentPiece).execute();
          break;
        case 'ArrowRight':
          new MoveCommand(currentPiece, 1, 0, grid, setCurrentPiece).execute();
          break;
        case 'ArrowDown':

          moveDown();
          break;
        case 'ArrowUp':
          new RotateCommand(currentPiece, grid, setCurrentPiece).execute();
          break;
        case ' ':
          e.preventDefault();
          while (new MoveCommand(currentPiece, 0, 1, grid, setCurrentPiece).canExecute()) {
            new MoveCommand(currentPiece, 0, 1, grid, setCurrentPiece).execute();
          }
          lockPiece();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPiece, grid, moveDown, lockPiece, gameOver, isPaused]);

  const renderGrid = () => {
    const displayGrid = grid.map(row => [...row]);
    
    currentPiece.getAbsoluteBlocks().forEach(b => {
      if (b.y >= 0 && b.y < 20 && b.x >= 0 && b.x < 10) {
        displayGrid[b.y][b.x] = currentPiece.type;
      }
    });

    return displayGrid.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={x}
            className="w-6 h-6 border border-gray-700"
            style={{
              backgroundColor: cell ? getColor(cell) : '#1a1a1a'
            }}
          />
        ))}
      </div>
    ));
  };

  const getColor = (type: BlockType): string => {
    const colors: Record<BlockType, string> = {
      I: '#00f0f0', O: '#f0f000', T: '#a000f0',
      S: '#00f000', Z: '#f00000', L: '#f0a000', J: '#0000f0'
    };
    return colors[type];
  };

  const restart = () => {
    setGrid(Array(20).fill(null).map(() => Array(10).fill(null)));
    setCurrentPiece(TetrominoFactory.createPiece());
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Tetris</h1>
      
      <div className="flex gap-8">
        <div className="bg-black p-2 rounded">
          {renderGrid()}
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Score</h2>
            <p className="text-3xl">{score}</p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Controls</h2>
            <p>← → Move</p>
            <p>↑ Rotate</p>
            <p>↓ Soft Drop</p>
            <p>Space: Hard Drop</p>
          </div>
          
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          
          {gameOver && (
            <div className="bg-red-600 p-4 rounded">
              <h2 className="text-xl font-bold mb-2">Game Over!</h2>
              <button
                onClick={restart}
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
              >
                Restart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TetrisGame;