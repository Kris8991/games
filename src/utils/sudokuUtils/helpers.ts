import { GRID_SIZE } from './types';
import type { SudokuGrid } from './types';

export const shuffleArray = <T>(arr: T[]): T[] => {
  const shuffledArray = [...arr];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }
  return shuffledArray;
};

export const createEmptyGrid = () => {
  return new Array(GRID_SIZE).fill().map(() => new Array(GRID_SIZE).fill(null));
};

export const createGameBoard = (
  matrix: SudokuGrid,
  hiddenCount: number = 40,
): SudokuGrid => {
  const allCellsCoordinates: { row: number; column: number }[] = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      allCellsCoordinates.push({ row: i, column: j });
    }
  }
  const shuffleCoordinates = shuffleArray(allCellsCoordinates);
  const hiddenCells = shuffleCoordinates.slice(0, hiddenCount);

  const board = matrix.map((row) => [...row]);
  hiddenCells.forEach(({ row, column }) => {
    board[row][column] = null;
  });
  return board;
};
