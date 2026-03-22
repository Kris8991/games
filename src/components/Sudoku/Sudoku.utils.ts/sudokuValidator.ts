import { GRID_SIZE, BOX_SIZE } from './types';
import type { ValidationParams } from './types';
export const checkValidate = (params: ValidationParams) => {
  const { grid, row, column, value } = params;

  const validateColumn = () => {
    for (let iRow = 0; iRow < GRID_SIZE; iRow++) {
      if (grid[iRow][column] === value && iRow !== row) return false;
    }
    return true;
  };

  const validateRow = () => {
    for (let iColumn = 0; iColumn < GRID_SIZE; iColumn++) {
      if (grid[row][iColumn] === value && iColumn !== column) return false;
    }
    return true;
  };

  const validateBox = () => {
    const firstRowInBox = row - (row % BOX_SIZE);
    const firstColumnInBox = column - (column % BOX_SIZE);

    for (let iRow = firstRowInBox; iRow < firstRowInBox + BOX_SIZE; iRow++) {
      for (
        let iColumn = firstColumnInBox;
        iColumn < firstColumnInBox + BOX_SIZE;
        iColumn++
      ) {
        if (grid[iRow][iColumn] === value && iRow !== row && iColumn !== column)
          return false;
      }
      return true;
    }
  };

  return validateColumn() && validateRow() && validateBox();
};
