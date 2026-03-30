import React from 'react';
import styles from './Sudoku.module.scss';

type SudokuInfoProps = {
  errorCount: number;
  helpsCount: number;
};

const SudokuInfo: React.FC<SudokuInfoProps> = ({ errorCount, helpsCount }) => {
  return (
    <div className={styles.recordsContainer}>
      <h3>Подсказок</h3>
      <p>{helpsCount}</p>
      <h3>Ошибок</h3>
      <p>{errorCount}</p>
      <div className={styles.list}></div>
    </div>
  );
};

export default SudokuInfo;
