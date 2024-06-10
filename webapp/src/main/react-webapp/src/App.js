import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import Board from './Board';
import PlayerInfo from './PlayerInfo';
import './App.css';

function App() {
  const [game, setGame] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [client, setClient] = useState(null);
  const [moves, setMoves] = useState([]);

  const playerId = window.playerId;

  useEffect(() => {
    if (!window.gameId) return;

    const newClient = new W3CWebSocket(`wss://localhost:8443/webapp/game/${window.gameId}`);
    // const newClient = new W3CWebSocket(`wss://caltuli.online/webapp_version_samya/game/${window.gameId}`);
    // const newClient = new W3CWebSocket(`wss://caltuli.online/webapp/game/${window.gameId}`);

    setClient(newClient);

    newClient.onopen = () => {
      console.log('WebSocket Client Connected');
      setIsConnected(true);
      const parsedState = JSON.parse(window.game);
      console.log('Parsed initialState:', parsedState);
      setGame(parsedState);
    };

    newClient.onmessage = function(event) {
      const data = JSON.parse(event.data);
      console.log("Mise à jour de l'état du jeu reçue", data);
    
      if (data.update === "secondPlayer") {
        setGame(prevState => ({
          ...prevState,
          secondPlayer: JSON.parse(data.newValue)
        }));
      }
      if (data.update === "gameState") {
        setGame(prevState => ({
          ...prevState,
          gameState: JSON.parse(data.newValue)
        }));
      }
      if (data.update === "colorsGrid") {
        setGame(prevState => ({
          ...prevState,
          colorsGrid: {
            ...prevState.colorsGrid,
            [`${data.x}-${data.y}`]: data.color
          }
        }));
      }

      if (data.update === "move") {
        // Ajout d'un nouveau mouvement à l'historique
        setMoves(prevMoves => [...prevMoves, data]);
        console.log("move => ", data);
      }

      if (data.update === "moveHistory") {
        setMoves(data.moves); // Mettre à jour les mouvements avec l'historique reçu du serveur
        console.log("moveHistory => ", data.moves);
      }
    };

    newClient.onclose = () => {
      console.log('WebSocket CLOSED');
      setIsConnected(false);
    };

    newClient.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => newClient.close();
  }, []);

  useEffect(() => {
    console.log("Updated game:", game);
  }, [game]);


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
    }
    return formattedGrid;
  };

  if (!game) return <div>Loading...</div>;

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
      
      {isConnected ? <p>Connected to server</p> : <p>Disconnected</p>}
      
      <p>Current Game: {JSON.stringify(game)}</p>

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
