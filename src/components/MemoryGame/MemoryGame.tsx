import React from "react";
import styles from "./MemoryGame.module.css";
//import type { CardType } from "./MemoryGame.utils";
import matrix from "./MemoryGame.utils";

const MemoryGame: React.FC = () => {
  console.log(matrix);
  // const [flippedCards, setFlippedCards] = useState<string[]>([]);
  // const [mathedCards, setMathedCards] = useState<string[]>([]);
  // const [isDisabled, setIsDisabled] = useState(false);
  // //const [isModalActive, setIsModalActive] = useState(false);

  // const handleClick = (rowIndex: number, index: number) => {
  //   const cardId = `${rowIndex}:${index}`;

  //   if (
  //     isDisabled ||
  //     flippedCards.includes(cardId) ||
  //     mathedCards.includes(cardId)
  //   )
  //     return;

  //   console.log(cardId);

  //   const indexCard = rowIndex * GRID_SIZE + index;

  //   console.log(indexCard);

  //   const newFlippedCards: string[] = [...flippedCards, cardId];
  //   setFlippedCards(newFlippedCards);

  //   console.log(newFlippedCards);

  //   if (newFlippedCards.length === 2) {
  //     setIsDisabled(true);
  //     const [first, second] = newFlippedCards;

  //     const [firstRow, firstIndex] = first.split(":").map(Number);
  //     const firstIndexCard = firstRow * GRID_SIZE + firstIndex;

  //     const [secondRow, secondIndex] = second.split(":").map(Number);
  //     const secondIndexCard = secondRow * GRID_SIZE + secondIndex;

  //     console.log(firstRow, firstIndex);

  //     console.log(firstIndexCard, secondIndexCard);

  //     if (
  //       newCardsState[firstIndexCard].value ===
  //       newCardsState[secondIndexCard].value
  //     ) {
  //       setMathedCards((prev) => {
  //         const newMathedCards = [...prev, first, second];
  //         if (newMathedCards.length === GRID_SIZE * GRID_SIZE) {
  //           setIsModalActive(true);
  //         }
  //         return newMathedCards;
  //       }); // проверка конец игры?
  //       setFlippedCards([]);
  //       setIsDisabled(false);
  //     } else {
  //       setTimeout(() => {
  //         setCardsState((prevCards) =>
  //           prevCards.map((card, i) => {
  //             if (i === firstIndexCard || i === secondIndexCard) {
  //               return { ...card, isFlipped: false };
  //             }
  //             console.log(mathedCards);
  //             return card;
  //           }),
  //         );
  //         setFlippedCards([]);
  //         setIsDisabled(false);
  //       }, 1000);
  //     }
  //   }
  // };

  // console.log(flippedCards);

  return (
    <>
      <h1>Memory Game</h1>
      <div className={styles.gridContainer}>
        {matrix.map((row, rowIndex) =>
          row.map((card, index) => (
            <div className={styles.card} key={`${rowIndex}:${index}`}>
              {card.isFlipped ? card.value : "?"}
            </div>
          )),
        )}
      </div>
    </>
  );
};

export default MemoryGame;
