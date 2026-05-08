import React from 'react';
import ReactDOM from 'react-dom';
import styles from './VictoryModal.module.scss';
import Button from '../../../ui/Button';

type VictoryModalProps = {
  isActive: boolean;
  onNewGame: () => void;
  displayTime?: string;
};

const VictoryModal: React.FC<VictoryModalProps> = ({
  isActive,
  onNewGame,
  displayTime,
}) => {
  if (!isActive) return null;
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Победа!</h2>
        <p>Вы нашли все пары за {displayTime} !</p>
        <Button onClick={onNewGame}>Новая игра</Button>
      </div>
    </div>,
    document.body,
  );
};
export default VictoryModal;
