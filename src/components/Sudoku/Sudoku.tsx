import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sudoku.module.scss';
import Cell from './Cell';
import { generateSudoku, createGameBoard } from './Sudoku.utils.ts/index.ts';

const Sudoku: React.FC = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [fullMatrix, setFullMatrix] = useState<number[][]>([]);
  const [gameBoard, setGameBoard] = useState<(number | null)[][]>([]);
  const [initialCells, setInitialCells] = useState<Set<string>>(new Set());
  const [errorCells, setErrorCells] = useState<Set<string>>(new Set());
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    column: number;
  } | null>(null);

  useEffect(() => {
    const generated = generateSudoku();
    setFullMatrix(generated);
    const board = createGameBoard(generated);
    setGameBoard(board);

    const initials = new Set<string>();
    board.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell !== null) {
          initials.add(`${i},${j}`);
        }
      });
    });

    setInitialCells(initials);
  }, []);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedCell) return;
      const { row, column } = selectedCell;
      const key = e.key;

      const cellKey = `${row},${column}`;
      const currentValue = gameBoard[row]?.[column];

      if (initialCells.has(cellKey)) return;
      if (currentValue !== null && !errorCells.has(cellKey)) return;

      let newValue: number | null = null;

      if (/^[1-9]$/.test(key)) {
        newValue = parseInt(key, 10);
      } else if (key === 'Backspace' || key === 'Delete') {
        newValue = null;
      } else if (key === 'H' || key === 'h' || key === 'Р' || key === 'р') {
        newValue = fullMatrix[row][column];
      } else return;

      setGameBoard((prevGameBoard) => {
        const newGameBoard = prevGameBoard.map((row) => [...row]);
        newGameBoard[row][column] = newValue;
        return newGameBoard;
      });

      setErrorCells((prevErrors) => {
        const newErrors = new Set(prevErrors);
        const key = `${row},${column}`;

        if (newValue !== null && fullMatrix[row][column] !== newValue) {
          newErrors.add(key);
        } else {
          newErrors.delete(key);
        }
        return newErrors;
      });
    },

    [selectedCell, fullMatrix, gameBoard, errorCells, initialCells],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const isInitialCell = useCallback(
    (row: number, column: number) => {
      return initialCells.has(`${row},${column}`);
    },
    [initialCells],
  );

  const handleCellSelect = useCallback(
    (row: number, column: number) => {
      const cellKey = `${row},${column}`;
      const currentValue = gameBoard[row]?.[column];

      if (initialCells.has(cellKey)) return;
      if (currentValue !== null && !errorCells.has(cellKey)) return;

      // if (isInitialCell(row, column)) return;

      setSelectedCell({ row, column });
    },
    [errorCells, initialCells, gameBoard],
  );

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
              isInitial={isInitialCell(rowIndex, index)}
              isError={isCellError(rowIndex, index)}
              isSelected={
                selectedCell?.row === rowIndex && selectedCell?.column === index
              }
              onSelect={() => handleCellSelect(rowIndex, index)}
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
