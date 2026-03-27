import React from 'react';
import styles from '../Sudoku.module.scss';
import { clsx } from 'clsx';

type CellProps = {
  cell: number | null;
  column: number;
  errorsCount: number;
  fullMatrix: number[][];
  helpsCount: number;
  isError: boolean;
  isInitial: boolean;
  isSelected: boolean;
  row: number;
  onErrorUsed: () => void;
  onHelpUsed: () => void;
  onSelect: (row: number, column: number) => void;
  onValueChange: (row: number, column: number, value: number | null) => void;
};

const Cell: React.FC<CellProps> = ({
  cell,
  column,
  errorsCount,
  fullMatrix,
  helpsCount,
  isError,
  isInitial,
  isSelected,
  row,
  onErrorUsed,
  onHelpUsed,
  onSelect,
  onValueChange,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (isInitial) return;
    if (cell !== null && !isError) return;

    const key = e.key;
    let newValue: number | null = null;

    if (/^[1-9]$/.test(key)) {
      newValue = parseInt(key, 10);
      if (isError) {
        if (errorsCount <= 3) {
          onErrorUsed();
        }
      }
    } else if (key === 'Backspace' || key === 'Delete') {
      newValue = null;
    } else if (key === 'H' || key === 'h' || key === 'Р' || key === 'р') {
      if (helpsCount > 0) {
        onHelpUsed();
        newValue = fullMatrix[row][column];
      } else {
        alert('Подсказки закончились');
      }
    } else {
      return;
    }

    onValueChange(row, column, newValue);
  };

  const handleClick = () => {
    if (isInitial) return;
    onSelect(row, column);
  };

  return (
    <div
      className={clsx(styles.cell, {
        [styles.initial]: isInitial,
        [styles.error]: isError,
        [styles.selected]: isSelected,
        [styles.userFilled]: !isInitial && cell !== null,
      })}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
    >
      <span>{cell !== null ? cell : ''}</span>
    </div>
  );
};

export default Cell;
