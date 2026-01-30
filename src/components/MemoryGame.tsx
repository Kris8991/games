import React from "react";
import "./Memory.css";

const MemoryGrid: React.FC = () => {
  const grid = [];
  for (let i = 1; i <= 16; ++i) {
    grid.push(i);
  }
  return (
    <div className="grid-container">
      {grid.map((cell) => (
        <div key={cell} className="grid-item">
          {cell}
        </div>
      ))}
    </div>
  );
};

export default MemoryGrid;
