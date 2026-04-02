import React, { memo } from 'react';
import styles from '../Sudoku.module.scss';
import { clsx } from 'clsx';

type CellProps = {
  accentValue: number | null;
  cell: number | null;
  column: number;
  row: number;
  isAccentBlock: boolean;
  isAccentColumn: boolean;
  isAccentRow: boolean;
  isError: boolean;
  isInitial: boolean;
  isSelected: boolean;
  onChange: (row: number, column: number, value: number | null) => void;
  onHelp: (row: number, column: number) => void;
  onSelect: (row: number, column: number) => void;
};

const Cell: React.FC<CellProps> = memo(
  ({
    accentValue,
    cell,
    column,
    row,
    isAccentBlock,
    isAccentColumn,
    isAccentRow,
    isError,
    isInitial,
    isSelected,
    onChange,
    onHelp,
    onSelect,
  }) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (isInitial) return;
      if (cell !== null && !isError) return;

      const key = e.key;

      if (/^[1-9]$/.test(key)) {
        const value = parseInt(key, 10);
        onChange(row, column, value);
      } else if (key === 'Backspace' || key === 'Delete') {
        onChange(row, column, null);
      } else if (key === 'H' || key === 'h' || key === 'Р' || key === 'р') {
        onHelp(row, column);
      }
    };

    const handleClick = () => {
      onSelect(row, column);
    };

    const isAccentCell =
      accentValue !== null && cell !== null && cell === accentValue;

    return (
      <div
        className={clsx(styles.cell, {
          [styles.isAccentBlock]: isAccentBlock,
          [styles.isAccentColumn]: isAccentColumn,
          [styles.isAccentRow]: isAccentRow,

          [styles.initial]: isInitial,
          [styles.error]: isError,
          [styles.selected]: isSelected,
          [styles.isAccentCell]: isAccentCell,
        })}
        onClick={handleClick}
        onKeyDown={handleKeyPress}
        tabIndex={-1}
      >
        <span>{cell !== null ? cell : ''}</span>
      </div>
    );
  },
);

export default Cell;
