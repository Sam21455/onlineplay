import React from 'react';
import './PlayerInfo.css';

/**
 * Le composant PlayerInfo représentant un conteneur pour :
 *  - affiche le nom du joueur,
 *  - indique à qui le tour de jouer.   
 * 
 * @component
 * 
 *  @param {string} player1 - Le nom du 1ER joueur  
 *  @param {string} player2 - Le nom 2EME joueur
 *  @param {boolean} isPlayer1Turn - La valeur boolean indiquant si c'est au tour du 1ER joueur (TRUE/FALSE)
 *  @param {boolean} isPlayer2Turn - La valeur boolean indiquant si c'est au tour du 2EME joueur (TRUE/FALSE)
 *  @returns {JSX} - Renvoie le conteneur avec le nom du joueur et indique le tour actuel.
 * 
 * 
*/
const PlayerInfo = ({ player1, player2, isPlayer1Turn, isPlayer2Turn }) => {
  return (
    <div className="player-info-container">
      <div className={`player-square ${isPlayer1Turn ? 'active-turn' : ''}`}>
        <span className="player-name">{player1}</span>
      </div>
      <div className={`player-square ${isPlayer2Turn ? 'active-turn' : ''}`}>
        <span className="player-name">{player2}</span>
      </div>
    </div>
  );
};

export default PlayerInfo;
