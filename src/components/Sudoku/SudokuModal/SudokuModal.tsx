import React from 'react';
import styles from './SudokuModal.module.scss';

type SudokuModalProps = {
  isActive: boolean;
  onNewGame: () => void;
  message: string;
};

const SudokuModal: React.FC<SudokuModalProps> = ({
  isActive,
  onNewGame,
  message,
}) => {
  if (!isActive) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <button onClick={onNewGame}>Новая игра</button>
      </div>
    </div>
  );
};
export default SudokuModal;
