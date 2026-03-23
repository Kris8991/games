import React from 'react';
import styles from '../Sudoku.module.scss';

type CellProps = {
  cell: number | null;
  isInitial: boolean;
  isSelected: boolean;
  isError: boolean;
  onSelect: () => void;
};

const Cell: React.FC<CellProps> = ({
  cell,
  isInitial,
  onSelect,
  isSelected,
  isError,
}) => {
  //const [isEditing, setIsEditing] = useState(false);
  // const [inputValue, setInputValue] = useState('');

  // const handleClick = () => {
  //   if (!isInitial || isError) {
  //     setIsEditing(true);
  //     setInputValue('');
  //   }
  // };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   if (value === '' || /^[1-9]$/.test(value)) {
  //     setInputValue(value);
  //   }
  // };

  // const handleBlur = () => {
  //   if (inputValue === '') {
  //     onChange?.(null);
  //   } else {
  //     const numValue = parseInt(inputValue, 10);
  //     if (numValue >= 1 && numValue <= 9) {
  //       onChange?.(numValue);
  //     }
  //   }
  //   setIsEditing(false);
  // };

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     handleBlur();
  //   } else if (e.key === 'Escape') {
  //     setIsEditing(false);
  //   }
  // };

  return (
    <div
      className={`${styles.cell} ${isInitial ? styles.initial : ''} ${isError ? styles.error : ''}  ${!isInitial && cell !== null ? styles.userFilled : ''}${isSelected ? styles.selected : ''}`}
      onClick={() => !isInitial && onSelect()}
    >
      <span>{cell !== null ? cell : ''}</span>
    </div>
  );
};

export default Cell;
