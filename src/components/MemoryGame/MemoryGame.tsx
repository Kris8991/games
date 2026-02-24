import React, { useRef, useState } from "react";
import styles from "./MemoryGame.module.css";
//import type { CardType } from "./MemoryGame.utils";
import { matrix } from "./MemoryGame.utils";

const MemoryGame: React.FC = () => {
  console.log(matrix);
  const firstCardId = useRef<string>("");
  const [cards, setCards] = useState(matrix);
  const [flippedCards, setFlippeCards] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  // const [isModalActive, setIsModalActive] = useState(false);

  const handleClick = (rowIndex: number, index: number) => {
    console.log("click");
    const cardId = `${rowIndex}:${index}`;

    if (firstCardId.current === "") {
      firstCardId.current = cardId;

      // setCards((prevCards) => {
      //   const newCards = [...prevCards];
      //   //newCards[rowIndex] = [...newCards[rowIndex]];
      //   newCards[rowIndex][index] = {
      //     ...newCards[rowIndex][index],
      //     isFlipped: true,
      //   };
      //   return newCards;
      // });

      matrix[rowIndex][index].isFlipped = true;
      setFlippeCards((prevValue) => [...prevValue, firstCardId.current]);
      return;
    }
    matrix[rowIndex][index].isFlipped = true;
    setFlippeCards((prevValue) => [...prevValue, cardId]);

    const [firstRow, firstIndex] = firstCardId.current.split(":").map(Number);
    const firstCard = matrix[firstRow][firstIndex].value;
    const secondCard = matrix[rowIndex][index].value;

    if (firstCard !== secondCard) {
      setTimeout(() => {
        matrix[firstRow][firstIndex].isFlipped = false;
        matrix[rowIndex][index].isFlipped = false;
        setFlippeCards((prevValue) =>
          prevValue.filter((id) => id !== cardId && id !== firstCardId.current),
        );
        firstCardId.current = "";
      }, 1000);
      return;
    }
  };

  return (
    <>
      <h1>Memory Game</h1>
      <div className={styles.gridContainer}>
        {cards.map((row, rowIndex) => {
          console.log(row);
          return row.map((card, index) => {
            console.log(card);
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
    </>
  );
};

export default MemoryGame;
