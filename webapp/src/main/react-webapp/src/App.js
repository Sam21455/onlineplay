import React, { useState } from 'react';
import useGameWebSocketClient from './GameWebSocketClient';
import PlayerInfo from './PlayerInfo';
import Board from './Board';
import './App.css';

/**
 * 
 * Composant représentant l'interface du jeu Puissance 4, il permet de : 
 *  - Gère l'état du jeu, 
 *  - La connexion WebSocket, 
 *  - Affiche le plateau du jeu,
 *  - Affiche le nom des joueurs
 *  - Indique le tour actuel  
 * 
 * Ainsi, on utilise ici les composants : Cell, Board, PlayerInfo. 
 * ces composants utilisent des données extraites de WebSocketClient. 
 * 
 * 
 * @component 
 * 
 * @returns {JSX.Element} - retourne l'interface du jeu Puissance 4 
 * 
*/
function App() {
  const [game, setGame] = useState(null);
  const [moves, setMoves] = useState([]);
  const playerId = window.playerId;
  const gameId = window.gameId;

  const { isConnected, client } = useGameWebSocketClient(
    gameId,
    window.game,
    setGame,
    setMoves
  );

  // handlePlay - pour gérer le coup joué par le joueur
  const handlePlay = (columnIndex) => {
    console.log(`handlePlay is called for column ${columnIndex}.`);    
    
    if (client && isConnected && game) {
      const isFirstPlayerTurn = game.gameState === 'WAIT_FIRST_PLAYER_MOVE';
      const isSecondPlayerTurn = game.gameState === 'WAIT_SECOND_PLAYER_MOVE'; 
      console.log("game.gameState = ", game.gameState);

      if ((isFirstPlayerTurn && (playerId == game.firstPlayer.id)) ||
          (isSecondPlayerTurn && (playerId == game.secondPlayer.id))) {
        
        const move = {
          update: 'colorsGrid',
          column: columnIndex,
          playerId: playerId
        };

        client.send(JSON.stringify(move));
      } 

      else {
        console.log("Not your turn.");
      }
    }
  };

  // formatColorsGrid() - pour formater les données de la grille de couleurs  
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

      {/* Affichage du plateau du jeu Puissance 4 */} 
      {game && game.colorsGrid && (
        <Board 
          gameId={gameId}
          colorsGrid={formatColorsGrid(game.colorsGrid)}
          handlePlay={handlePlay}
          playerId={playerId}
          gameState={game.gameState}
          firstPlayerId={game.firstPlayer.id}
          secondPlayerId={game.secondPlayer ? game.secondPlayer.id : null}
        />
      ) }

      {/* Affichage de l'historique du jeu */}
      <div>
        <h3>Move History</h3>
        <ul>
          {moves.map((move, index) => (
            <li key={index}>
              Player [{move.playerId}] 
              played column {move.move} 
              at position ({move.x}, {move.y}) - {move.color}
            </li>
          ) ) }
        </ul>
      </div>
      
    </div>
  );

}

export default App;
