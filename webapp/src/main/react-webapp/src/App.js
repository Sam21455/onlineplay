import React, { useState } from 'react';
import useWebSocketClient from './WebSocketClient';
import Board from './Board';
import PlayerInfo from './PlayerInfo';
import './App.css';

function App() {
  const [game, setGame] = useState(null);
  const [moves, setMoves] = useState([]);
  const playerId = window.playerId;
  const gameId = window.gameId;

  const { isConnected, client } = useWebSocketClient(gameId, window.game, setGame, setMoves);

  const handlePlay = (columnIndex) => {
    console.log(`handlePlay is called for column ${columnIndex}.`);
    
    if (client && isConnected && game) {
      const isFirstPlayerTurn = game.gameState === 'WAIT_FIRST_PLAYER_MOVE';
      const isSecondPlayerTurn = game.gameState === 'WAIT_SECOND_PLAYER_MOVE';
      if ((isFirstPlayerTurn && (playerId == game.firstPlayer.id)) ||
          (isSecondPlayerTurn && (playerId == game.secondPlayer.id))) {
        const move = {
          update: 'colorsGrid',
          column: columnIndex,
          playerId: playerId
        };
        client.send(JSON.stringify(move));
      } else {
        console.log("Not your turn.");
      }
    }
  };

  const formatColorsGrid = (colorsGrid) => {
    if (!colorsGrid) {
      return {};
    }
    const formattedGrid = {};
    for (const [key, value] of Object.entries(colorsGrid)) {
      formattedGrid[key] = value.toLowerCase();
      console.log("formattedGrid[key] = ", formattedGrid[key].toLowerCase());
    }
    return formattedGrid;
  };


  if (!game)
    return <div>Loading</div>;

  // Extraire les noms des joueurs
  const gameStateString = JSON.stringify(game);
  const parsedGameState = JSON.parse(gameStateString);
  const player1Name = parsedGameState.firstPlayer ? parsedGameState.firstPlayer.username : 'Waiting for 1st player ... ';
  const player2Name = parsedGameState.secondPlayer ? parsedGameState.secondPlayer.username : 'Waiting for 2nd player ... ';

  // Déterminer si c'est le tour du joueur 1 ou du joueur 2
  const isPlayer1Turn = game.gameState === 'WAIT_FIRST_PLAYER_MOVE';
  const isPlayer2Turn = game.gameState === 'WAIT_SECOND_PLAYER_MOVE';

  return (
    <div className="App">
      
      <div className="connection-status">
        <div className={`status-light ${isConnected ? 'connected' : 'disconnected'}`} />
        {isConnected ? 'Connected to server' : 'Disconnected'}
      </div>

      <p className="game-state">Current Game: {game.gameState.replace(/_/g, ' ').toLowerCase()}</p>

      {/* Affichage des joueurs dans des carrés */}
      <PlayerInfo
        player1={player1Name}
        player2={player2Name}
        isPlayer1Turn={isPlayer1Turn}
        isPlayer2Turn={isPlayer2Turn}
      />

      {game && game.colorsGrid && (
        <Board
          colorsGrid={formatColorsGrid(game.colorsGrid)}
          handlePlay={handlePlay}
          playerId={playerId}
          gameState={game.gameState}
          firstPlayerId={game.firstPlayer.id}
          secondPlayerId={game.secondPlayer ? game.secondPlayer.id : null}
        />
      )}

      <div>
        <h3>Move History</h3>
        <ul>
          {moves.map((move, index) => (
            <li key={index}>
              Player [{move.playerId}] 
              played column {move.move} 
              at position ({move.x}, {move.y}) - {move.color}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default App;
