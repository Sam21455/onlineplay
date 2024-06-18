# Spécification du Module `GameWebSocketClient`

Le module `GameWebSocketClient` facilite la communication bidirectionnelle entre le client et le serveur pour le jeu Puissance 4. Il gère l'établissement d'une connexion WebSocket, écoute les événements du serveur, et met à jour l'état du jeu en réponse aux messages reçus.

## Fonctionnalités Principales

1. **Connexion WebSocket**
   - Le module établit une connexion WebSocket avec le serveur en utilisant l'URL spécifiée contenant l'identifiant unique du jeu (`gameId`).

2. **Gestion des Événements WebSocket**
   - **`onopen` :** Lorsque la connexion est établie, le module signale la connexion réussie et récupère l'état initial du jeu à partir des données fournies par le serveur.
   - **`onmessage` :** Le module écoute les messages entrants du serveur, qui peuvent inclure des mises à jour d'état du jeu, des mouvements des joueurs, ou des changements dans la grille de jeu.
   - **`onclose` :** En cas de fermeture de la connexion WebSocket, le module gère cette événement et met à jour l'état de la connexion.
   - **`onerror` :** En cas d'erreur dans la connexion WebSocket, le module gère l'erreur et signale le problème.

3. **Mise à Jour de l'État du Jeu**
   - Le module met à jour l'état du jeu en réponse aux messages reçus du serveur. Il utilise des gestionnaires d'événements pour traiter les mises à jour spécifiques, telles que l'ajout d'un second joueur, les changements d'état du jeu, les mises à jour de la grille de jeu, les mouvements des joueurs, et l'historique des mouvements.

4. **Utilisation avec React**
   - Le module est souvent utilisé comme un hook personnalisé (`useGameWebSocketClient`) dans une application React. Ce hook permet d'intégrer facilement la logique de gestion WebSocket dans les composants React, facilitant ainsi la mise à jour dynamique de l'interface utilisateur en réponse aux événements du jeu.

## Interfaces et Dépendances

- **Dépendances :** Utilisation de la bibliothèque WebSocket `w3cwebsocket` de 'websocket' pour établir et gérer la connexion WebSocket avec le serveur.
  
- **Utilisation :** Intégré dans une application front-end utilisant React, avec des hooks personnalisés pour la gestion des états et des mouvements du jeu.

## Exemple d'Utilisation

```javascript
import { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

/**
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
}

export default useGameWebSocketClient;
```

## Notes Additionnelles

Le `GameWebSocketClient` est conçu pour être robuste et capable de gérer des interactions dynamiques entre plusieurs clients jouant simultanément au jeu Puissance 4. Il permet une mise à jour en temps réel de l'interface utilisateur en réponse aux actions des joueurs et aux événements du serveur.