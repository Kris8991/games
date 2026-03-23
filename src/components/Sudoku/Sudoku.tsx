import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sudoku.module.scss';
import Cell from './Cell';
import { generateSudoku, createGameBoard } from './Sudoku.utils.ts/index.ts';

const Sudoku: React.FC = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [fullMatrix, setFullMatrix] = useState<number[][]>([]);
  const [gameBoard, setGameBoard] = useState<(number | null)[][]>([]);
  const [errorCells, setErrorCells] = useState<Set<string>>(new Set());

  useEffect(() => {
    const generated = generateSudoku();
    setFullMatrix(generated);
    const board = createGameBoard(generated);
    setGameBoard(board);
  }, []);

  const updateCell = (row: number, column: number, value: number | null) => {
    setGameBoard((prevGameBoard) => {
      const newGameBoard = prevGameBoard.map((row) => [...row]);
      newGameBoard[row][column] = value;
      setErrorCells((prevErrors) => {
        const newErrors = new Set(prevErrors);
        const key = `${row},${column}`;

        if (value !== null && fullMatrix[row][column] !== value) {
          newErrors.add(key);
        } else {
          newErrors.delete(key);
        }
        return newErrors;
      });
      return newGameBoard;
    });
  };

  const isCellError = (row: number, column: number) => {
    return errorCells.has(`${row},${column}`);
  };
  return (
    <div className={styles.container}>
      <h1>Welcome sudoku. </h1>
      <div className={styles.sudokuGrid}>
        {gameBoard.map((row, rowIndex) =>
          row.map((cell, index) => (
            <Cell
              key={`${rowIndex}:${index}`}
              cell={cell}
              isInitial={gameBoard[rowIndex][index] !== null}
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
