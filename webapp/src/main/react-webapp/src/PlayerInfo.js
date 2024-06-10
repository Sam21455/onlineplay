// PlayerInfo.js

import React from 'react';
import './PlayerInfo.css';

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
