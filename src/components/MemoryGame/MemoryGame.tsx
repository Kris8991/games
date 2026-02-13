import React, { useState } from "react";
import initialCards from "./MemoryGame.utils";
import styles from "./MemoryGame.module.css";
import type { CardType } from "./MemoryGame.utils"; // сделать рандомную отрисовку карточек: 1) функция перемешивания

//
const GRID_SIZE = 4;
const shuffleCards = (cards: CardType[]): CardType[] => {
  return [...cards].sort(() => Math.random() - 0.5);
};
const MemoryGame: React.FC = () => {
  const [cardsState, setCardsState] = useState<CardType[]>(() =>
    shuffleCards(initialCards),
  );
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [mathedCards, setMathedCards] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);

  console.log(cardsState);

  const handleClick = (rowIndex: number, index: number) => {
    const cardId = `${rowIndex}:${index}`;

    if (
      isDisabled ||
      flippedCards.includes(cardId) ||
      mathedCards.includes(cardId)
    )
      return;

    console.log(cardId);

    const indexCard = rowIndex * GRID_SIZE + index;
    const newCardsState = cardsState.map((card, i) =>
      i === indexCard
        ? {
            ...card,
            isFlipped: true,
          }
        : card,
    );

    console.log(indexCard);

    setCardsState(newCardsState);
    const newFlippedCards: string[] = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    console.log(newCardsState);
    console.log(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsDisabled(true);
      const [first, second] = newFlippedCards;

      const [firstRow, firstIndex] = first.split(":").map(Number);
      const firstIndexCard = firstRow * GRID_SIZE + firstIndex;

      const [secondRow, secondIndex] = second.split(":").map(Number);
      const secondIndexCard = secondRow * GRID_SIZE + secondIndex;

      console.log(firstRow, firstIndex);

      console.log(firstIndexCard, secondIndexCard);

      if (
        newCardsState[firstIndexCard].value ===
        newCardsState[secondIndexCard].value
      ) {
        setMathedCards((prev) => [...prev, first, second]);
        setFlippedCards([]);
        setIsDisabled(false);
      } else {
        setTimeout(() => {
          setCardsState((prevCards) =>
            prevCards.map((card, i) => {
              if (i === firstIndexCard || i === secondIndexCard) {
                return { ...card, isFlipped: false };
              }
              console.log(mathedCards);
              return card;
            }),
          );
          setFlippedCards([]);
          setIsDisabled(false);
        }, 1000);
      }
    }
  };

  console.log(flippedCards);

  const gridRows = [];
  for (let i = 0; i < cardsState.length; i += GRID_SIZE) {
    gridRows.push(cardsState.slice(i, i + GRID_SIZE));
  }
  return (
    <div className={styles.gameWrapper}>
      <h1>Memory Game</h1>
      <div className={styles.gridContainer}>
        {gridRows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.gridRow}>
            {row.map((card, index) => {
              const cardId = `${rowIndex}:${index}`;
              const isFlipped = flippedCards.includes(cardId);
              const isMathed = mathedCards.includes(cardId);
              return (
                <div
                  key={cardId}
                  className={styles.card}
                  onClick={() => handleClick(rowIndex, index)}
                >
                  {isFlipped || isMathed ? card.value : "?"}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
