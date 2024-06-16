import { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

function useWebSocketClient(gameId, initialGame, setGame, setMoves) {
  const [isConnected, setIsConnected] = useState(false);
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (!gameId){
      return ;
    }

    const newClient = new W3CWebSocket(`wss://localhost:8443/webapp/game/${gameId}`);
    // const newClient = new W3CWebSocket(`wss://caltuli.online/webapp_version_samya/game/${gameId}`);
    // const newClient = new W3CWebSocket(`wss://caltuli.online/webapp/game/${gameId}`);

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
  }, [gameId, setGame, setMoves]);

  return {
    isConnected,
    client,
  };
};


export default useWebSocketClient;
