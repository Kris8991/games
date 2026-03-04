import Card from "../Card/Card";
import styles from "../MemoryGame.module.css";
import type { CardType } from "../MemoryGame.utils";

const GameBoard = ({
  cards,
  flippedCards,
  onCardClick,
  difficulty,
}: {
  cards: CardType[][];
  flippedCards: string[];
  onCardClick: (rowIndex: number, index: number) => void;
  difficulty: "normal" | "hard";
}) => {
  console.log(flippedCards);
  return (
    <div
      className={
        difficulty === "normal"
          ? styles.gridNormalContainer
          : styles.gridHardContainer
      }
    >
      {cards.map((row, rowIndex) => {
        return row.map((card, index) => {
          console.log(card);
          const cardId = `${rowIndex}:${index}`;
          const isFlipped = flippedCards.includes(cardId);
          console.log(isFlipped);
          return (
            <Card
              key={cardId}
              card={card}
              isFlipped={isFlipped}
              onClick={() => onCardClick(rowIndex, index)}
            />
          );
        });
      })}
    </div>
  );
};
export default GameBoard;
