import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sudoku.module.scss';
import Cell from './Cell';
import { generateSudoku, createGameBoard } from './Sudoku.utils.ts';
import SudokuModal from './SudokuModal/SudokuModal';
import SudokuInfo from './SudokuInfo/SudokuInfo.tsx';
import MobileControls from './MobileControls/MobileControls.tsx';
import { TfiArrowCircleLeft } from 'react-icons/tfi';

const Sudoku: React.FC = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [accentNumber, setAccentNumber] = useState<number | null>(null);
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

  const accentNumberRef = useRef(accentNumber);
  const correctCellsCount = useRef(0);
  const gameBoardRef = useRef(gameBoard);
  const helpsCountsRef = useRef(helpsCount);
  const selectedCellRef = useRef(selectedCell);

  useEffect(() => {
    accentNumberRef.current = accentNumber;
    gameBoardRef.current = gameBoard;
    helpsCountsRef.current = helpsCount;
    selectedCellRef.current = selectedCell;
  }, [
    accentNumber,
    fullMatrix,
    gameBoard,
    helpsCount,
    initialCells,
    selectedCell,
  ]);

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
    correctCellsCount.current = 0;
    helpsCountsRef.current = helpsCount;
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

      const isEmpty = value === null;
      const isCorrect = value !== null && value === fullMatrix[row][column];

      setErrorCells((prevErrors) => {
        const wasError = prevErrors.has(cellKey);
        const newErrors = new Set(prevErrors);

        if (!isEmpty && !isCorrect) {
          newErrors.add(cellKey);
        } else if ((isCorrect || isEmpty) && wasError) {
          newErrors.delete(cellKey);
        }

        return newErrors;
      });

      if (!isEmpty && !isCorrect) {
        setErrorsCount((prevCount) => {
          const newCount = prevCount + 1;
          if (newCount === 3) {
            setIsModalActive(true);
            setModalMessage('Вы проиграли');
          }
          return newCount;
        });
      }

      if (isCorrect) {
        correctCellsCount.current += 1;
      }

      if (correctCellsCount.current === 40) {
        setTimeout(() => {
          setIsModalActive(true);
          setModalMessage('Вы выиграли!');
        }, 0);
      }
    },
    [fullMatrix],
  );

  const handleHelp = useCallback(
    (row: number, column: number) => {
      const correctValue = fullMatrix[row][column];
      const currenthelpsCounts = helpsCountsRef.current;

      if (currenthelpsCounts <= 0) {
        alert('Подсказки закончились');
        return;
      }
      setHelpsCount((prev) => prev - 1);
      handleValueChange(row, column, correctValue);
    },
    [fullMatrix, handleValueChange],
  );

  const handleCellSelect = useCallback((row: number, column: number) => {
    setSelectedCell({ row, column });
    const currentaccentNumber = accentNumberRef.current;
    const currentgameBoard = gameBoardRef.current;

    const clickedCellValue = currentgameBoard[row][column];

    if (clickedCellValue !== null) {
      if (currentaccentNumber === clickedCellValue) {
        return;
      } else {
        setAccentNumber(clickedCellValue);
      }
    } else {
      setAccentNumber(null);
    }
  }, []);

  const handleNumberInput = useCallback(
    (value: number | null) => {
      const currentSelectedCell = selectedCellRef.current;

      if (currentSelectedCell) {
        const { row, column } = currentSelectedCell;
        if (!currentSelectedCell) return;
        handleValueChange(row, column, value);
      }
    },
    [handleValueChange],
  );

  const handleHelpButton = useCallback(() => {
    const currentSelectedCell = selectedCellRef.current;
    const isInitialSelected = currentSelectedCell
      ? initialCells.has(
          `${currentSelectedCell.row},${currentSelectedCell.column}`,
        )
      : false;
    if (currentSelectedCell) {
      const { row, column } = currentSelectedCell;
      if (isInitialSelected) return;
      handleHelp(row, column);
    } else {
      alert('Сначала выберите ячейку');
    }
  }, [handleHelp, initialCells]);

  const handleEraseButton = useCallback(() => {
    const currentSelectedCell = selectedCellRef.current;
    const isInitialSelected = currentSelectedCell
      ? initialCells.has(
          `${currentSelectedCell.row},${currentSelectedCell.column}`,
        )
      : false;
    if (currentSelectedCell) {
      const { row, column } = currentSelectedCell;
      if (isInitialSelected) return;
      handleValueChange(row, column, null);
    }
  }, [handleValueChange, initialCells]);

  return (
    <div className={styles.container}>
      <SudokuInfo errorCount={errorsCount} helpsCount={helpsCount} />
      <div className={styles.sudokuGrid}>
        {gameBoard.map((row, rowIndex) =>
          row.map((cell, columnIndex) => {
            const cellKey = `${rowIndex},${columnIndex}`;

            const isAccentRow = selectedCell && selectedCell.row === rowIndex;
            const isAccentColumn =
              selectedCell && selectedCell.column === columnIndex;
            const isAccentBlock =
              selectedCell &&
              Math.floor(selectedCell.row / 3) === Math.floor(rowIndex / 3) &&
              Math.floor(selectedCell.column / 3) ===
                Math.floor(columnIndex / 3);

            return (
              <Cell
                key={cellKey}
                cell={cell}
                column={columnIndex}
                row={rowIndex}
                isAccentBlock={!!isAccentBlock}
                isAccentColumn={!!isAccentColumn}
                isAccentRow={!!isAccentRow}
                accentValue={accentNumber}
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
        )}
      </div>
      <MobileControls
        helpsCount={helpsCount}
        onNumberInput={handleNumberInput}
        onErase={handleEraseButton}
        onHelp={handleHelpButton}
      />
      <button className={styles.goBack} onClick={goBack}>
        <TfiArrowCircleLeft /> К выбору игры
      </button>
      <SudokuModal
        isActive={isModalActive}
        message={modalMessage}
        onNewGame={resetGame}
      />
    </div>
  );
};

export default Sudoku;
