import React, { useState } from 'react';
import styles from './Cell.module.scss';

type CellProps = {
  cell: number | null;
  isInitial: boolean;
  onChange?: (value: number | null) => void;
  isError: boolean;
  row?: number;
  col?: number;
};

const Cell: React.FC<CellProps> = ({ cell, isInitial, onChange, isError }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    if (!isInitial && cell === null) {
      setIsEditing(true);
      setInputValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[1-9]$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleBlur = () => {
    if (inputValue === '') {
      setIsEditing(false);
      return;
    }

    const numValue = parseInt(inputValue, 10);
    if (numValue >= 1 && numValue <= 9) {
      onChange?.(numValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`${styles.cell} ${isInitial ? styles.initial : ''} ${isError ? styles.error : ''} ${cell !== null && !isInitial ? styles.userFilled : ''}`}
      onClick={handleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          maxLength={1}
          className={styles.input}
        />
      ) : (
        <span>{cell !== null ? cell : ''}</span>
      )}
    </div>
  );
};

export default Cell;
