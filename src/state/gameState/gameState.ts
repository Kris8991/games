import { create } from 'zustand';

type GameState = {
  accentNumber: number | null;
  errorCells: Set<string>;
  errorsCount: number;
  fullMatrix: number[][];
  gameBoard: (number | null)[][];
  helpsCount: number;
  initialCells: Set<string>;
  isModalActive: boolean;
  modalMessage: string;
  selectedCell: {
    row: number;
    column: number;
  } | null;

  setAccentNumber: (accent: number | null) => void;
  setErrorCells: (updater: (prev: Set<string>) => Set<string>) => void;
  setErrorsCount: (updater: (prev: number) => number) => void;
  setFullMatrix: (matrix: number[][]) => void;
  setGameBoard: (
    updater: (prev: (number | null)[][]) => (number | null)[][],
  ) => void;
  setHelpsCount: (updater: (prev: number) => number) => void;
  setInitialCells: (updater: (prev: Set<string>) => Set<string>) => void;
  setIsModalActive: (active: boolean) => void;
  setModalMessage: (message: string) => void;
  setSelectedCell: (selected: { row: number; column: number } | null) => void;
};

export const useGameState = create<GameState>((set) => ({
  accentNumber: null,
  errorCells: new Set(),
  errorsCount: 0,
  fullMatrix: [],
  gameBoard: [],
  helpsCount: 3,
  initialCells: new Set(),
  isModalActive: false,
  modalMessage: '',
  selectedCell: null,

  setAccentNumber: (accent) => set({ accentNumber: accent }),
  setErrorCells: (updater) =>
    set((error) => ({ errorCells: updater(error.errorCells) })),
  setErrorsCount: (updater) =>
    set((count) => ({ errorsCount: updater(count.errorsCount) })),
  setFullMatrix: (matrix) => set({ fullMatrix: matrix }),
  setGameBoard: (updater) =>
    set((board) => ({ gameBoard: updater(board.gameBoard) })),
  setHelpsCount: (updater) =>
    set((helps) => ({ helpsCount: updater(helps.helpsCount) })),
  setInitialCells: (updater) =>
    set((cells) => ({ initialCells: updater(cells.initialCells) })),
  setIsModalActive: (active) => set({ isModalActive: active }),
  setModalMessage: (message) => set({ modalMessage: message }),
  setSelectedCell: (selected) => set({ selectedCell: selected }),
}));
