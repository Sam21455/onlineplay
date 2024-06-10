// Board.js

import React from 'react';
import Cell from './Cell';

const Board = ({ colorsGrid, handlePlay, playerId, gameState, firstPlayerId, secondPlayerId }) => {
  const isFirstPlayerTurn = (gameState === 'WAIT_FIRST_PLAYER_MOVE');
  const isSecondPlayerTurn = (gameState === 'WAIT_SECOND_PLAYER_MOVE') || (gameState === 'WAIT_OPPONENT' && playerId === secondPlayerId);

  const isPlayerTurn = (isFirstPlayerTurn && playerId === firstPlayerId) || (isSecondPlayerTurn && playerId === secondPlayerId);

  const renderCell = (x, y) => {
    const cellKey = `${y}-${x}`;
    const cellState = colorsGrid[cellKey] || 'empty';

    return (
      <Cell
        key={cellKey}
        className={`cell ${cellState.toLowerCase()} ${!isPlayerTurn ? 'disabled' : ''}`}
        onClick={() => handlePlay(x)}
      />
    );
  };

  const renderRow = (y) => {
    const columns = [0, 1, 2, 3, 4, 5, 6];
    return (
      <div key={y} className="row">
        {columns.map(x => renderCell(x, 5 - y))}
      </div>
    );
  };

  const renderGrid = () => {
    const rows = [0, 1, 2, 3, 4, 5];
    return <div className="grid">{rows.map(y => renderRow(y))}</div>;
  };

  return <div className="board">{renderGrid()}</div>;
};

export default Board;
