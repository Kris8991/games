export type CardType<T> = {
  value: T;
  isFlipped: boolean;
};
const generateInitialArray = <T>(arr: T[]): CardType<T>[] => {
  return arr.map((item) => ({
    value: item,
    isFlipped: false,
  }));
};
const shuffleCards = <T>(cards: CardType<T>[]): CardType<T>[] => {
  return [...cards].sort(() => Math.random() - 0.5);
};
const generateInitialMatrix = <T>(arr: CardType<T>[]): CardType<T>[][] => {
  const pairedCards: CardType<T>[] = [];
  for (const item of arr) {
    pairedCards.push({ ...item });
    pairedCards.push({ ...item });
  }
  const shuffledArr = shuffleCards(pairedCards);
  const matrix: CardType<T>[][] = [];
  for (let row = 0; row < 4; row++) {
    matrix[row] = [];
    for (let col = 0; col < 4; col++) {
      const index = row * 4 + col;
      matrix[row][col] = shuffledArr[index];
    }
  }
  return matrix;
};
const initialCards = generateInitialArray([
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
]);
const matrix = generateInitialMatrix(initialCards);
console.log(matrix);
export default matrix;
// const getCards = <T>(
//   items: CardType<T>[],
// rows:number,
// cols:number
// ):CardType<T>[][] =>{
//   const gameMatrix = rows * cols;
//   const
// }
