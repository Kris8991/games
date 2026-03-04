const ENGLISH_ALPHABET = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export type CardType = {
  value: string;
};

export type Difficulty = "normal" | "hard";

const CARD_COUNTS = {
  normal: 8,
  hard: 18,
};

const GRID_SIZE = {
  normal: 4,
  hard: 6,
};
//const count = difficulty === "normal" ? 8 : 18;

// принимает число, вырезает кусок массива из массива английского алфавита = числу(8 или 18).  Возвращает массив карточек
const getCards = (difficulty: Difficulty): CardType[] => {
  const count = CARD_COUNTS[difficulty];
  const initialArray = ENGLISH_ALPHABET.slice(0, count);
  return initialArray.map((item) => ({
    value: item,
  }));
};

export const generateMatrix = (
  difficulty: Difficulty = "normal",
): CardType[][] => {
  const cards = getCards(difficulty);
  const pairedCards: CardType[] = [];
  for (const item of cards) {
    pairedCards.push({ ...item });
    pairedCards.push({ ...item });
  }
  pairedCards.sort(() => Math.random() - 0.5);
  const size = GRID_SIZE[difficulty];
  const matrix: CardType[][] = [];
  for (let row = 0; row < size; row++) {
    matrix[row] = [];
    for (let col = 0; col < size; col++) {
      const index = row * size + col;
      matrix[row][col] = pairedCards[index];
    }
  }
  return matrix;
};
export const matrix = generateMatrix("normal");
