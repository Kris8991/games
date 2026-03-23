const IMAGES_CAT = [
  '../public/images/cat_1.png',
  '../public/images/cat_2.png',
  '../public/images/cat_3.png',
  '../public/images/cat_4.png',
  '../public/images/cat_5.png',
  '../public/images/cat_6.png',
  '../public/images/cat_7.png',
  '../public/images/cat_8.png',
  '../public/images/cat_9.png',
  '../public/images/cat_10.png',
  '../public/images/cat_11.png',
  '../public/images/cat_12.png',
  '../public/images/cat_13.png',
  '../public/images/cat_14.png',
  '../public/images/cat_15.png',
  '../public/images/cat_16.png',
  '../public/images/cat_17.png',
  '../public/images/cat_18.png',
];

export type CardType = {
  value: string;
};

export type Difficulty = 'normal' | 'hard';

const CARD_COUNTS = {
  normal: 8,
  hard: 18,
};

const GRID_SIZE = {
  normal: 4,
  hard: 6,
};
const getCards = (difficulty: Difficulty): CardType[] => {
  const count = CARD_COUNTS[difficulty];
  const initialArray = IMAGES_CAT.slice(0, count);
  return initialArray.map((item) => ({
    value: item,
  }));
};

export const generateMatrix = (
  difficulty: Difficulty = 'normal',
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
export const matrix = generateMatrix('normal');
