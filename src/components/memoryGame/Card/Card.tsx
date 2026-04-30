import React from 'react';
import styles from './Card.module.scss';
import type { CardType } from '../MemoryGame.utils';

type CardProps = {
  card: CardType;
  isFlipped: boolean;
  onClick: () => void;
};

const Card: React.FC<CardProps> = ({ card, isFlipped, onClick }) => (
  <div
    className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
    onClick={onClick}
  >
    {isFlipped ? <img src={card.value} /> : '?'}
  </div>
);

export default Card;
