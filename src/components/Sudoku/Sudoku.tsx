import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sudoku.module.scss';
import Cell from './Cell';
import { generateSudoku, createGameBoard } from './Sudoku.utils.ts';
import SudokuModal from './SudokuModal/SudokuModal';
import SudokuInfo from './SudokuInfo.tsx';

const Sudoku: React.FC = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [correctCells, setCorrectCells] = useState<Set<string>>(new Set());
  const [errorCells, setErrorCells] = useState<Set<string>>(new Set());
  const [errorsCount, setErrorsCount] = useState<number>(0);
  const [fullMatrix, setFullMatrix] = useState<number[][]>([]);
  const [gameBoard, setGameBoard] = useState<(number | null)[][]>([]);
  const [helpsCount, setHelpsCount] = useState<number>(3);
  const [initialCells, setInitialCells] = useState<Set<string>>(new Set());
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    column: number;
  } | null>(null);

  const resetGame = () => {
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
    setErrorCells(new Set());
    setSelectedCell(null);
    setHelpsCount(3);
    setErrorsCount(0);
    setIsModalActive(false);
    setCorrectCells(new Set());
  };

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
  const handleValueChange = useCallback(
    (row: number, column: number, value: number | null) => {
      const cellKey = `${row},${column}`;
      setGameBoard((prevGameBoard) => {
        const currentValue = prevGameBoard[row]?.[column];
        if (currentValue === value) return prevGameBoard;

        const newGameBoard = prevGameBoard.map((rowArr) => [...rowArr]);
        newGameBoard[row][column] = value;
        return newGameBoard;
      });

      setErrorCells((prevErrors) => {
        const isCorrect = value !== null && value === fullMatrix[row][column];
        const wasError = prevErrors.has(cellKey);
        const newErrors = new Set(prevErrors);

        if (value !== null && !isCorrect) {
          newErrors.add(cellKey);

          setErrorsCount((prevCount) => {
            const newCount = prevCount + 1;

            if (newCount === 3) {
              setIsModalActive(true);
              setModalMessage('Вы проиграли');
            }
            return newCount;
          });
        } else if ((isCorrect || value === null) && wasError) {
          newErrors.delete(cellKey);
        }

        return newErrors;
      });

      setCorrectCells((prevCells) => {
        const isCorrect = value !== null && value === fullMatrix[row][column];
        const newCorrectCells = new Set(prevCells);

        if (isCorrect) {
          newCorrectCells.add(cellKey);
          setTimeout(() => {
            setCorrectCells((currentCells) => {
              if (currentCells.size === 40) {
                setIsModalActive(true);
                setModalMessage('Вы выиграли!');
              }
              return currentCells;
            });
          }, 0);
        } else {
          newCorrectCells.delete(cellKey);
        }

        return newCorrectCells;
      });
    },
    [fullMatrix],
  );

  const handleHelp = useCallback(
    (row: number, column: number) => {
      const correctValue = fullMatrix[row][column];
      if (helpsCount <= 0) {
        alert('Подсказки закончились');
        return;
      }
      setHelpsCount((prev) => prev - 1);
      handleValueChange(row, column, correctValue);
    },
    [helpsCount, fullMatrix, handleValueChange],
  );

  const handleCellSelect = useCallback((row: number, column: number) => {
    setSelectedCell({ row, column });
  }, []);

  const grid = useMemo(() => {
    return gameBoard.map((row, rowIndex) =>
      row.map((cell, columnIndex) => {
        const cellKey = `${rowIndex},${columnIndex}`;

        return (
          <Cell
            key={cellKey}
            cell={cell}
            column={columnIndex}
            row={rowIndex}
            isError={errorCells.has(cellKey)}
            isInitial={initialCells.has(cellKey)}
            isSelected={
              selectedCell?.row === rowIndex &&
              selectedCell?.column === columnIndex
            }
            onChange={handleValueChange}
            onHelp={handleHelp}
            onSelect={handleCellSelect}
          />
        );
      }),
    );
  }, [
    gameBoard,
    errorCells,
    initialCells,
    selectedCell,
    handleValueChange,
    handleHelp,
    handleCellSelect,
  ]);

  return (
    <div className={styles.container}>
      <h1>Sudoku</h1>
      <div className={styles.sudokuGrid}>{grid}</div>
      <button className={styles.goBack} onClick={goBack}>
        ◀️ К выбору игры
      </button>
      <SudokuModal
        isActive={isModalActive}
        message={modalMessage}
        onNewGame={resetGame}
      />
      <SudokuInfo errorCount={errorsCount} helpsCount={helpsCount} />
    </div>
  );
};

export default Sudoku;
