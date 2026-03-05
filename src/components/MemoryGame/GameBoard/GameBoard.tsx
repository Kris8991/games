import React from 'react';
import Card from '../Card/Card';
import styles from '../MemoryGame.module.css';
import type { CardType } from '../MemoryGame.utils';

type GameBoardProps = {
  cards: CardType[][];
  difficulty: 'normal' | 'hard';
  flippedCards: string[];
  onCardClick: (rowIndex: number, index: number) => void;
};

const GameBoard: React.FC<GameBoardProps> = ({
  cards,
  difficulty,
  flippedCards,
  onCardClick,
}) => (
  <div
    className={
      difficulty === 'normal'
        ? styles.gridNormalContainer
        : styles.gridHardContainer
    }
  >
    {cards.map((row, rowIndex) =>
      row.map((card, index) => {
        const cardId = `${rowIndex}:${index}`;
        const isFlipped = flippedCards.includes(cardId);
        return (
          <Card
            key={cardId}
            card={card}
            isFlipped={isFlipped}
            onClick={() => onCardClick(rowIndex, index)}
          />
        );
      }),
    )}
  </div>
);

export default GameBoard;
