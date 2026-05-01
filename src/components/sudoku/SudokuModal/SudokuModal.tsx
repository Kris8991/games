import React from 'react';
import styles from './SudokuModal.module.scss';
import Button from '../../../ui/Button';

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
        <Button onClick={onNewGame}>Новая игра</Button>
      </div>
    </div>
  );
};
export default SudokuModal;
