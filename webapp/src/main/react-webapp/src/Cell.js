import React from 'react';

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