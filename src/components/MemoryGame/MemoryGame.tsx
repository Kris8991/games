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
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [mathedCards, setMathedCards] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);

  console.log(cardsState);

  const handleClick = (cardIndex: number) => {
    if (
      isDisabled ||
      flippedCards.includes(cardIndex) ||
      mathedCards.includes(cardIndex)
    )
      return;

    console.log(cardIndex);

    const newCardsState = cardsState.map((card, index) =>
      index === cardIndex
        ? {
            ...card,
            isFlipped: true,
          }
        : card,
    );

    setCardsState(newCardsState);
    const newFlippedCards: number[] = [...flippedCards, cardIndex];
    setFlippedCards(newFlippedCards);
    console.log(newCardsState);
    console.log(newFlippedCards);
    if (newFlippedCards.length === 2) {
      setIsDisabled(true);
      const [first, second] = newFlippedCards;
      console.log(first, newCardsState[first].value);
      if (newCardsState[first].value === newCardsState[second].value) {
        setMathedCards((prev) => [...prev, first, second]);
        setFlippedCards([]);
        setIsDisabled(false);
      } else {
        //const currentMathedCards = [...mathedCards];
        setTimeout(() => {
          setCardsState((prevCards) =>
            prevCards.map((card) => {
              if (
                (cardIndex === first || cardIndex === second) &&
                !mathedCards.includes(cardIndex)
              ) {
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
            {row.map((card, index) => (
              <div
                key={index}
                className={styles.card}
                onClick={() => handleClick(index)}
              >
                {card.isFlipped ? card.value : "?"}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
