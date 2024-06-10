import React from 'react';

const Cell = ({ className, onClick }) => {
  return <div className={className} onClick={onClick}></div>;
};

export default Cell;
