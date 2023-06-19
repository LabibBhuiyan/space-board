import React, { useState, useEffect } from 'react';
import './Board.css';

const Board = () => {
  const boardSize = 6;
  const startingCoordinates = [0, 0];
  const endingCoordinates = [boardSize - 1, boardSize - 1];
  const teleportationSquares = [[1, 4], [4, 1]];
  const magnetSquare = [[3, 5], [1, 2]];

  const [playerCoordinates, setPlayerCoordinates] = useState(startingCoordinates);
  const [rolledNumber, setRolledNumber] = useState(null);
  const [isVictory, setIsVictory] = useState(false);
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    const [playerRow, playerCol] = playerCoordinates;

    if (playerRow >= endingCoordinates[0] && playerCol >= endingCoordinates[1]) {
      setIsVictory(true);
    } else {
      setIsVictory(false);
    }
  }, [playerCoordinates, endingCoordinates]);

  const rollDice = () => {
    const number = Math.floor(Math.random() * 6) + 1;
    setRolledNumber(number);
    return number;
  };

  const movePlayer = () => {
    let steps = rollDice();
    const [currentRow, currentCol] = playerCoordinates;

    let newRow = currentRow;
    let newCol = currentCol + steps;

    if (newCol >= boardSize) {
      newRow += Math.floor(newCol / boardSize);
      newCol %= boardSize;
    }

    if (newRow >= boardSize) {
      newRow = boardSize - 1;
      newCol = boardSize - 1;
    }

    if (isTeleportationSquare(newRow, newCol)) {
      [newRow, newCol] = getTeleportationDestination(newRow, newCol);
    }

    if (isMagnetSquare(newRow, newCol)) {
      const magnetIndex = magnetSquare.findIndex(
        (magnet) => magnet[0] === newRow && magnet[1] === newCol
      );
      if (magnetIndex !== -1) {
        const magnet = magnetSquare[magnetIndex];
        const [magnetRow, magnetCol] = magnet;
        const distance = Math.abs(currentRow - magnetRow) + Math.abs(currentCol - magnetCol);
        steps = Math.max(steps - distance, 1);
        newRow = magnetRow;
        newCol = magnetCol;
      }
    }

    setPlayerCoordinates([newRow, newCol]);
    setStepCount(stepCount + steps);
  };

  const isTeleportationSquare = (row, col) => {
    return teleportationSquares.some(([teleRow, teleCol]) => teleRow === row && teleCol === col);
  };

  const getTeleportationDestination = (row, col) => {
    for (const [teleRow, teleCol] of teleportationSquares) {
      if (teleRow === row && teleCol === col) {
        const [destRow, destCol] = teleportationSquares.find(([r, c]) => r !== row || c !== col);
        return [destRow, destCol];
      }
    }
  };

  const isMagnetSquare = (row, col) => {
    return magnetSquare.some((magnet) => magnet[0] === row && magnet[1] === col);
  };

  const renderBoard = () => {
    const board = [];

    for (let row = 0; row < boardSize; row++) {
      const cells = [];

      for (let col = 0; col < boardSize; col++) {
        const isPlayerHere = playerCoordinates[0] === row && playerCoordinates[1] === col;
        const isStartSquare = startingCoordinates[0] === row && startingCoordinates[1] === col;
        const isEndSquare = endingCoordinates[0] === row && endingCoordinates[1] === col;
        const isTeleportSquare = isTeleportationSquare(row, col);
        const isMagnet = isMagnetSquare(row, col);

        const cellContent = isPlayerHere ? <div className="player-icon">🚀</div> : null;

        const cellClass = `cell ${isTeleportSquare ? 'teleport' : ''} ${isStartSquare ? 'start' : ''} ${
          isEndSquare ? 'end' : ''
        } ${isMagnet ? 'magnet' : ''}`;

        cells.push(
          <div className={cellClass} key={`${row}-${col}`}>
            {cellContent}
          </div>
        );
      }

      board.push(<div className="row" key={row}>{cells}</div>);
    }

    return board;
  };

  return (
    <div className="board">
      <div className="game-board">{renderBoard()}</div>
      <div className="button-container">
        <button
          className="roll-dice-button"
          onClick={movePlayer}
          disabled={isVictory}
        >
          {isVictory ? 'Victory!' : 'Roll Dice'}
        </button>
        {rolledNumber && (
          <div className="rolled-number">Rolled Number: {rolledNumber}</div>
        )}
      </div>
      {isVictory && (
        <div className="game-message">
          Congratulations! You reached the stars in {stepCount} steps!
        </div>
      )}
    </div>
  );
};

export default Board;
