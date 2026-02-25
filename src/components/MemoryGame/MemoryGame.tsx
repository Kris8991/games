import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./MemoryGame.module.css";

import type { Difficulty } from "./MemoryGame.utils";
import { matrix, generateMatrix } from "./MemoryGame.utils";

const MemoryGame: React.FC = () => {
  console.log(matrix);
  const firstCardId = useRef<string>("");
  const [cards, setCards] = useState(matrix);
  const [flippedCards, setFlippeCards] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    setCards(generateMatrix(newDifficulty));
    setFlippeCards([]);
    firstCardId.current = "";
    setIsModalActive(false);
  };

  const handleNewGameStart = (): void => {
    setCards(generateMatrix(difficulty));
    setFlippeCards([]);
    firstCardId.current = "";
    setIsModalActive(false);
  };
  console.log(matrix);

  const handleClick = (rowIndex: number, index: number) => {
    const cardId = `${rowIndex}:${index}`;

    if (isDisabled) return;
    if (flippedCards.includes(cardId)) return;

    setCards((prevCards) => {
      const newCards = [...prevCards];
      newCards[rowIndex][index] = {
        ...newCards[rowIndex][index],
        isFlipped: true,
      };

      const totalCards = newCards.flat().length;
      const flippedCount = newCards
        .flat()
        .filter((card) => card.isFlipped).length;
      console.log(totalCards, flippedCount);

      if (totalCards === flippedCount) {
        setTimeout(() => {
          setIsModalActive(true);
          console.log("Победа!");
        }, 0);
      }
      return newCards;
    });

    if (firstCardId.current === "") {
      firstCardId.current = cardId;
      console.log(firstCardId.current);
      setFlippeCards((prevValue) => [...prevValue, firstCardId.current]);
      return;
    }

    setFlippeCards((prevValue) => [...prevValue, cardId]);

    const [firstRow, firstIndex] = firstCardId.current.split(":").map(Number);
    const firstCard = cards[firstRow][firstIndex].value;
    const secondCard = cards[rowIndex][index].value;

    if (firstCard !== secondCard) {
      setIsDisabled(true);

      const firstCardIdRef = firstCardId.current;
      const secondCardId = cardId;

      setTimeout(() => {
        setCards((prevCards) => {
          const newCards = [...prevCards];

          const [r1, i1] = firstCardIdRef.split(":").map(Number);
          newCards[r1] = [...newCards[r1]];
          newCards[r1][firstIndex] = {
            ...newCards[r1][i1],
            isFlipped: false,
          };

          const [r2, i2] = secondCardId.split(":").map(Number);
          newCards[r2] = [...newCards[r2]];
          newCards[r2][i2] = {
            ...newCards[r2][i2],
            isFlipped: false,
          };
          return newCards;
        });
        setFlippeCards((prevValue) =>
          prevValue.filter(
            (id) => id !== firstCardIdRef && id !== secondCardId,
          ),
        );
        firstCardId.current = "";
        setIsDisabled(false);
      }, 1000);
      return;
    }
    firstCardId.current = "";
  };
  return (
    <>
      <h1>Memory Game</h1>
      <div className={styles.buttonWrapper}>
        <button onClick={() => handleDifficultyChange("normal")}>Normal</button>
        <button onClick={() => handleDifficultyChange("hard")}>Hard</button>
      </div>
      <div
        className={
          difficulty === "normal"
            ? styles.gridNormalContainer
            : styles.gridHardContainer
        }
      >
        {cards.map((row, rowIndex) => {
          return row.map((card, index) => {
            return (
              <div
                className={styles.card}
                key={`${rowIndex}:${index}`}
                onClick={() => handleClick(rowIndex, index)}
              >
                {card.isFlipped ? card.value : "?"}
              </div>
            );
          });
        })}
      </div>
      {isModalActive &&
        ReactDOM.createPortal(
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Победа!</h2>
              <p>Вы нашли все пары!</p>
              <button onClick={handleNewGameStart}>Новая игра</button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default MemoryGame;
