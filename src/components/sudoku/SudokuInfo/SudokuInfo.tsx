import React from 'react';
import styles from './SudokuInfo.module.scss';

type SudokuInfoProps = {
  errorCount: number;
  helpsCount: number;
};

const SudokuInfo: React.FC<SudokuInfoProps> = ({ errorCount, helpsCount }) => {
  return (
    <div className={styles.sudokuInfo}>
      <h3>Подсказок: {helpsCount}</h3>
      <h3>Ошибок: {errorCount}</h3>
    </div>
  );
};

export default SudokuInfo;
