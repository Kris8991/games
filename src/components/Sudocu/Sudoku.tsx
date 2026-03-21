import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sudoku.module.scss';
import Cell from './Cell/Cell';

const INITIAL_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const shuffleArray = <T,>(arr: T[]): T[] => {
  const shuffledArray = [...arr];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const generateSudokuMatrix = () => {
  const row0 = shuffleArray(INITIAL_ARRAY);

  const divideArr = (arr: number[]) => {
    const block1 = arr.slice(0, 3);
    const block2 = arr.slice(3, 6);
    const block3 = arr.slice(6, 9);
    const arr1 = [...block2, ...block3, ...block1];
    const arr2 = [...block3, ...block1, ...block2];

    return [arr1, arr2];
  };
  const [row1, row2] = divideArr(row0);

  const shiftArr = (arr: number[]) => {
    return [arr[arr.length - 1], ...arr.slice(0, -1)];
  };
  const row3 = shiftArr(row0);

  const [row4, row5] = divideArr(row3);

  const row6 = shiftArr(row3);
  const [row7, row8] = divideArr(row6);
  return [row0, row1, row2, row3, row4, row5, row6, row7, row8];
};

const Sudoku: React.FC = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const fullMatrix = generateSudokuMatrix();

  const [gameMatrix, setGameMatrix] = useState<(number | null)[][]>(() => {
    const allCellsCoordinates: { row: number; col: number }[] = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        allCellsCoordinates.push({ row: i, col: j });
      }
    }
    const shuffleCoordinates = shuffleArray(allCellsCoordinates);
    const hiddenCells = shuffleCoordinates.slice(0, 40);

    const matrix = fullMatrix.map((row) => [...row]);
    hiddenCells.forEach(({ row, col }) => {
      matrix[row][col] = null;
    });
    return matrix;
  });

  const [errorCells, setErrorCells] = useState<Set<string>>(new Set());

  const updateCell = (row: number, col: number, value: number | null) => {
    setGameMatrix((prevMatrix) => {
      const newMatrix = prevMatrix.map((row) => [...row]);
      newMatrix[row][col] = value;
      setErrorCells((prevErrors) => {
        const newErrors = new Set(prevErrors);
        const key = `${row},${col}`;
        if (value !== null && fullMatrix[row][col] !== value) {
          newErrors.add(key);
        } else {
          newErrors.delete(key);
        }
        return newErrors;
      });
      return newMatrix;
    });
  };

  const isCellError = (row: number, col: number) => {
    return errorCells.has(`${row},${col}`);
  };
  return (
    <div className={styles.container}>
      <h1>Welcome sudoku. </h1>
      <div className={styles.sudokuGrid}>
        {gameMatrix.map((row, rowIndex) =>
          row.map((cell, index) => (
            <Cell
              key={`${rowIndex}:${index}`}
              cell={cell}
              isInitial={gameMatrix[rowIndex][index] !== null}
              isError={isCellError(rowIndex, index)}
              onChange={(value) => updateCell(rowIndex, index, value)}
            />
          )),
        )}
      </div>
      <button className={styles.goBack} onClick={goBack}>
        ◀-- К выбору игры
      </button>
    </div>
  );
};

export default Sudoku;
