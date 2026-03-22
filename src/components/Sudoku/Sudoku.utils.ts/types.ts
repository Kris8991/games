export const GRID_SIZE = 9;
export const BOX_SIZE = 3;
export const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export type Cell = {
  row: number;
  column: number;
};

export type SudokuGrid = (number | null)[][];

export type ValidationParams = {
  grid: SudokuGrid;
  row: number;
  column: number;
  value: number;
};
