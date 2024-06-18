import React from 'react';

/**
 * Le composant Cell représente une case individuelle du plateau
 * 
 * @component
 * 
 * @param {number} CoordX - La coordonnée X (ligne) de la case du plateau
 * @param {number} CoordY - La coordonnée Y (colonne) de la case du plateau
 * @param {function} onClick - La fonction appelée lorsque la case est cliquée.
 * @param {string} value - La valeur de la cellule, utilisée pour définir la classe CSS (par exemple, "playerA", "playerB", ou une couleur).
 * @returns {JSX.Element} - Renvoie la composante la Cell 
*/
const Cell = ({ CoordX, CoordY, onClick, value }) => {
  
  const cellClassName = `cell ${value}`;

  return (
    <div
      id={`cell-${CoordX}-${CoordY}`}
      className={cellClassName}
      onClick={onClick}>
    </div>
  );
};

export default Cell;