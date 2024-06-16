import React from 'react';
import Cell from './Cell';

const Board = ({ colorsGrid, handlePlay, playerId, gameState, firstPlayerId, secondPlayerId }) => {
  const isFirstPlayerTurn = gameState === 'WAIT_FIRST_PLAYER_MOVE';
  const isSecondPlayerTurn = gameState === 'WAIT_SECOND_PLAYER_MOVE' || (gameState === 'WAIT_OPPONENT' && playerId === secondPlayerId);
  const isPlayerTurn = (isFirstPlayerTurn && playerId === firstPlayerId) || (isSecondPlayerTurn && playerId === secondPlayerId);

  const rows = [0, 1, 2, 3, 4, 5];
  const columns = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div className="board">
      {rows.map(y => (
        <div key={y} className="row">
          {columns.map(x => {
            const cellKey = `${6 - 1 - y}-${x}`;
            const cellState = colorsGrid[cellKey] || 'empty';
            return (
              <Cell
                key={cellKey}
                CoordX={x}
                CoordY={y}
                value={cellState.toLowerCase()}
                onClick={() => handlePlay(x)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
