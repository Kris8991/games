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

  const handleClick = (cardId: number) => {
    if (
      isDisabled ||
      flippedCards.includes(cardId) ||
      mathedCards.includes(cardId)
    )
      return;

    const newCardsState = cardsState.map((card) =>
      card.id === cardId
        ? {
            ...card,
            isFlipped: true,
          }
        : card,
    );

    setCardsState(newCardsState);
    const newFlippedCards: number[] = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsDisabled(true);
      const [first, second] = newFlippedCards;

      if (newCardsState[first].value === newCardsState[second].value) {
        setMathedCards((prev) => [...prev, first, second]);
        setFlippedCards([]);
        setIsDisabled(false);
      } else {
        const currentMathedCards = [...mathedCards];
        setTimeout(() => {
          setCardsState((prevCards) =>
            prevCards.map((card) => {
              if (
                (card.id === first || card.id === second) &&
                !currentMathedCards.includes(card.id)
              ) {
                return { ...card, isFlipped: false };
              }
              console.log(currentMathedCards);
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
            {row.map((card) => (
              <div
                key={card.id}
                className={styles.card}
                onClick={() => handleClick(card.id)}
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
