import React, { memo } from 'react';
import styles from '../Sudoku.module.scss';
import { TfiEraser, TfiHelp } from 'react-icons/tfi';
import {} from 'react-icons/tfi';

type MobileControlsProps = {
  helpsCount: number;
  onNumberInput: (value: number | null) => void;
  onErase: () => void;
  onHelp: () => void;
};

const MobileControls: React.FC<MobileControlsProps> = memo(
  ({ helpsCount, onNumberInput, onErase, onHelp }) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      <div className={styles.mobilePanel}>
        <div className={styles.numberPad}>
          {numbers.map((num) => (
            <button
              key={num}
              className={styles.numberButton}
              onClick={() => onNumberInput(num)}
              // disabled={disabled}
            >
              {num}
            </button>
          ))}
        </div>
        <div className={styles.actionButtons}>
          <button onClick={onErase}>
            <TfiEraser /> Стереть
          </button>
          <button onClick={onHelp}>
            <TfiHelp /> Подсказка ({helpsCount})
          </button>
        </div>
      </div>
    );
  },
);

export default MobileControls;
