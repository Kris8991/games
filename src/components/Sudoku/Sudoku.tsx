import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sudoku.module.scss';
import Cell from './Cell';
import { generateSudoku, createGameBoard } from './Sudoku.utils.ts';
import SudokuModal from './SudokuModal/SudokuModal';
import SudokuInfo from './SudokuInfo.tsx';

const Sudoku: React.FC = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [correctCells, setCorrectCells] = useState<string[]>([]);
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
    setCorrectCells([]);
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

  const handleValueChange = (
    row: number,
    column: number,
    newValue: number | null,
  ) => {
    setGameBoard((prevGameBoard) => {
      const currentValue = prevGameBoard[row]?.[column];
      if (currentValue === newValue) return prevGameBoard;

      const newGameBoard = prevGameBoard.map((row) => [...row]);
      newGameBoard[row][column] = newValue;

      const cellKey = `${row},${column}`;
      const isCorrect =
        newValue !== null && fullMatrix[row][column] === newValue;

      setCorrectCells((prev) => {
        if (isCorrect) {
          if (prev.includes(cellKey)) return prev;

          const newCorrectCells = [...prev, cellKey];

          if (newCorrectCells.length === 40) {
            setIsModalActive(true);
            setModalMessage('Вы выиграли!');
          }

          return newCorrectCells;
        } else {
          return prev;
        }
      });

      setErrorCells((prevErrors) => {
        const newErrors = new Set(prevErrors);

        if (newValue !== null && !isCorrect) {
          if (!newErrors.has(cellKey)) {
            newErrors.add(cellKey);
          }
        } else if (isCorrect || newValue === null) {
          if (newErrors.has(cellKey)) {
            newErrors.delete(cellKey);
          }
        }
        return newErrors;
      });
      return newGameBoard;
    });
  };
  const handleErrorCount = () => {
    setErrorsCount((prev) => {
      const newCount = prev + 1;
      if (newCount === 3) {
        setIsModalActive(true);
        setModalMessage('Вы проиграли');
      }
      return newCount;
    });
  };

  const decrementHelpsCount = () => {
    setHelpsCount((prev) => prev - 1);
  };

  const handleCellSelect = (row: number, column: number) => {
    setSelectedCell({ row, column });
  };

  const isInitialCell = (row: number, column: number) => {
    return initialCells.has(`${row},${column}`);
  };
  const isCellError = (row: number, column: number) => {
    return errorCells.has(`${row},${column}`);
  };

  return (
    <div className={styles.container}>
      <h1>Судоку</h1>
      <div className={styles.helpsInfo}>Подсказки: {helpsCount}</div>
      <div className={styles.sudokuGrid}>
        {gameBoard.map((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <Cell
              cell={cell}
              column={columnIndex}
              errorsCount={errorsCount}
              fullMatrix={fullMatrix}
              helpsCount={helpsCount}
              isError={isCellError(rowIndex, columnIndex)}
              isInitial={isInitialCell(rowIndex, columnIndex)}
              isSelected={
                selectedCell?.row === rowIndex &&
                selectedCell?.column === columnIndex
              }
              key={`${rowIndex}:${columnIndex}`}
              row={rowIndex}
              onErrorUsed={handleErrorCount}
              onHelpUsed={decrementHelpsCount}
              onSelect={handleCellSelect}
              onValueChange={handleValueChange}
            />
          )),
        )}
      </div>
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
