import React from 'react';
import styles from '../MemoryGame.module.css';
import type { CardType } from '../MemoryGame.utils';

type Props = {
  card: CardType;
  isFlipped: boolean;
  onClick: () => void;
};

const Card: React.FC<Props> = ({ card, isFlipped, onClick }) => (
  <div
    className={isFlipped ? styles.cardFlipped : styles.card}
    onClick={onClick}
  >
    {isFlipped ? card.value : '?'}
  </div>
);

export default Card;
