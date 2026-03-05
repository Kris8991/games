import React from 'react';
import styles from '../MemoryGame.module.css';
import type { Difficulty } from '../MemoryGame.utils';

type DifficultyButtonsProps = {
  onDifficultyChange: (difficulty: Difficulty) => void;
};

const DifficultyButtons: React.FC<DifficultyButtonsProps> = ({
  onDifficultyChange,
}) => (
  <div className={styles.buttonWrapper}>
    <button onClick={() => onDifficultyChange('normal')}>Normal</button>
    <button onClick={() => onDifficultyChange('hard')}>Hard</button>
  </div>
);

export default DifficultyButtons;
