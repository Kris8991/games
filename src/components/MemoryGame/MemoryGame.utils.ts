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
  isFlipped: boolean;
};
// принимает число, вырезает кусок массива из массива английского алфавита = числу(7 или 17).  Возвращает массив карточек
const getCards = (count: number): CardType[] => {
  const initialArray = ENGLISH_ALPHABET.slice(0, count);
  return initialArray.map((item) => ({
    value: item,
    isFlipped: false,
  }));
};

//Принимает массив карточек (8 или 18), удваивает его и перемешивает. На выходе pairedCards массив
const generateMatrix = (cards: CardType[], size: number = 4): CardType[][] => {
  const pairedCards: CardType[] = [];
  for (const item of cards) {
    pairedCards.push({ ...item });
    pairedCards.push({ ...item });
  }
  pairedCards.sort(() => Math.random() - 0.5);

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
export const matrix = generateMatrix(getCards(8));
