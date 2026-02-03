import React, { useState } from "react";
import InitialCards from "./InitialCards";

const MemoryGame: React.FC = () => {
  const gridSize = 4;
  const [cardsState, setCardsState] = useState(InitialCards);

  const gridRows = [];

  for (let i = 0; i < cardsState.length; i += gridSize) {
    gridRows.push(cardsState.slice(i, i + gridSize));
  }

  const handleClick = (cardId: number) => {
    setCardsState((cardsState) =>
      cardsState.map((card) =>
        card.id === cardId
          ? {
              ...card,
              isFlipped: !card.isFlipped,
            }
          : card,
      ),
    );
  };

  return (
    <div className="grid-container">
      {gridRows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((card) => (
            <div
              key={card.id}
              className={`card ${card.isFlipped ? "flipped" : ""}`}
              onClick={() => handleClick(card.id)}
            >
              {card.isFlipped ? card.value : "?"}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default MemoryGame;
