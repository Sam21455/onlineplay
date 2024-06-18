import { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

/**
 * 
 * Hook utilisé pour permettre la communication avec le serveur du jeu identifié par `gameId`,
 * gère les messages entrants pour mettre à jour l'état du jeu et les mouvements,
 * et surveille l'état de la connexion.
 *  
 * @param {string} gameId - l'ID unique du jeu utilisé pour la connexion
 * @param {object} initialGame - L'état initial du jeu
 * @param {fonction} setGame - Fonction de mise à jour d'état pour mettre à jour l'état du jeu.
 * @param {fonction} setMoves - Fonction de mise à jour d'état pour mettre à jour les mouvements du jeu.
 * @returns {object} - Renvoie un objet contenant :
 *  - 'isConnected' : une valeur booléan indiquant si le Web Socket est actuellement connecté.
 *  - 'client' : l'instance du client Web Socket
 * 
*/
function useGameWebSocketClient(gameId, initialGame, setGame, setMoves) {
  const [isConnected, setIsConnected] = useState(false);
  const [client, setClient] = useState(null);


  useEffect(() => { 

    if (!gameId) return ; 

    const newClient = new W3CWebSocket(`wss://localhost:8443/webapp/game/${gameId}`);
      // const newClient = new W3CWebSocket(`wss://caltuli.online/webapp_version_samya/game/${gameId}`);
      // const newClient = new W3CWebSocket(`wss://caltuli.online/webapp/game/${gameId}`);

    setClient(newClient);

    // onopen()
    newClient.onopen = () => {
        console.log('WebSocket Client Connected');
          setIsConnected(true);
          const parsedState = JSON.parse(window.game);
          console.log('Parsed initialState:', parsedState);
          setGame(parsedState);
    };

    // onmessage()
    // on utilise une table de correspondance (plutot des conditions "if").
    newClient.onmessage = function(event) {
      const data = JSON.parse(event.data);
      console.log("Mise à jour de l'état du jeu reçue", data);

      const updateHandlers = {
        "secondPlayer": () => setGame(prevState => ({
          ...prevState,
          secondPlayer: JSON.parse(data.newValue)
        })),
        "gameState": () => setGame(prevState => ({
          ...prevState,
          gameState: JSON.parse(data.newValue)
        })),
        "colorsGrid": () => setGame(prevState => ({
          ...prevState,
          colorsGrid: {
            ...prevState.colorsGrid,
            [`${data.x}-${data.y}`]: data.color
          }
        })),
        "move": () => {
          setMoves(prevMoves => [...prevMoves, data]);
          console.log("move => ", data);
        },
        "moveHistory": () => {
          setMoves(data.moves);
          console.log("moveHistory => ", data.moves);
        }
      };

      const handler = updateHandlers[data.update];
      if (handler) {
        handler();
      }
    };

    // onclose()
    newClient.onclose = () => {
      console.log('WebSocket CLOSED');
        setIsConnected(false);
    };      

    // onerror
    newClient.onerror = (error) => {
      console.error('WebSocket error:', error);
    }; 

    return () => newClient.close();
  }, [gameId,
    setGame,
    setMoves]
  );

  return {
    isConnected,
    client,
  };

}; 



export default useGameWebSocketClient;