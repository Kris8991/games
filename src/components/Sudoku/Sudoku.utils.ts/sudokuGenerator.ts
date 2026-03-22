import type { SudokuGrid, Cell } from './types';
import { numbers, GRID_SIZE } from './types';

import { createEmptyGrid, shuffleArray } from './helpers';
import { checkValidate } from './sudokuValidator';

export const resolveSudoku = (grid: SudokuGrid) => {
  const findEmptyCell = (grid: SudokuGrid): Cell | null => {
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let column = 0; column < GRID_SIZE; column++) {
        if (grid[row][column] === null) return { row, column };
      }
    }
    return null;
  };
  const emptyCell = findEmptyCell(grid);
  if (!emptyCell) return true;
  const shuffleNumbers = shuffleArray(numbers);

  for (let i = 0; i < shuffleNumbers.length; i++) {
    const value = shuffleNumbers[i];
    if (
      !checkValidate({
        grid,
        row: emptyCell.row,
        column: emptyCell.column,
        value,
      })
    )
      continue;
    else {
      grid[emptyCell.row][emptyCell.column] = value;
    }

    if (resolveSudoku(grid)) return true;
    else grid[emptyCell.row][emptyCell.column] = null;
  }
};

export const generateSudoku = () => {
  const sudoku = createEmptyGrid();

  resolveSudoku(sudoku);
  console.log(sudoku);
  return sudoku;
};
