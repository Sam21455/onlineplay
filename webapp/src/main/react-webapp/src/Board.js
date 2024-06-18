import React from 'react';
import Cell from './Cell';
import './Board.css';

/**
 * Le composant Board représentant le plateau du jeu Puissance 4
 * 
 * 
 * @component
 * 
 * @param {Objet - dictionnaire} colorsGrid - Le dictionnaire (extraite de GamewebsocketClient depuis App.js)
 * @param {fonction} handlePlay - La fonction callback utilisée quand un joueur clique sur une case du plateau (définie dans App.js)
 * @param {string} playerId - Le ID du joueur (extraite de GameWebSocketClient depuis App.js)
 * @param {string} gameState - L'état du jeu (extraite de GameWebSocketClient depuis App.js)
 * @param {string} firstPlayerId - Le ID du 1ER joueur (extraite de GameWebSocketClient depuis App.js)
 * @param {string} secondPlayerId - Le ID du 2EME joueur (extraite de GameWebSocketClient depuis App.js)
 * @returns {JSX.Element} - retourne le composant board
 * 
*/
const Board = ({ colorsGrid, handlePlay, playerId, gameState, firstPlayerId, secondPlayerId }) => {
  
  const isFirstPlayerTurn = gameState === 'WAIT_FIRST_PLAYER_MOVE';
  const isSecondPlayerTurn = gameState === 'WAIT_SECOND_PLAYER_MOVE' || (gameState === 'WAIT_OPPONENT' && playerId === secondPlayerId);
  const isPlayerTurn = (isFirstPlayerTurn && playerId === firstPlayerId) || (isSecondPlayerTurn && playerId === secondPlayerId);
  
  return (
    <div className="board">
      {[0, 1, 2, 3, 4, 5].map(y => (
        <div key={y} className="row">

          {[0, 1, 2, 3, 4, 5, 6].map(x => {
        
            // création de la clé
            const cellKey = `${6 - 1 - y}-${x}`;
            // Utilisation du dictionnaire colorsGrid:
            const cellState = colorsGrid[cellKey] || 'empty';
            
            return (
              <Cell
                key={cellKey}
                CoordX={x}
                CoordY={y}
                value={`cell ${cellState.toLowerCase()} ${!isPlayerTurn ? 'disabled' : ''}`}
                onClick={() => handlePlay(x)}
              />
            );
          } ) }
        </div>
      ) ) }
    </div>
  );
};


export default Board;