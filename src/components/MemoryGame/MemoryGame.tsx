import React, { useRef, useState } from "react";

import type { Difficulty } from "./MemoryGame.utils";
import { matrix, generateMatrix } from "./MemoryGame.utils";
import DifficultyButtons from "./DifficultyButtons/DifficultyButtons";
import GameBoard from "./GameBoard/GameBoard";
import VictoryModal from "./VictoryModal/VictoryModal";
import WelcomeMessage from "./WelcomeMessage/WelcomeMessage";

const MemoryGame: React.FC = () => {
  console.log(matrix);
  const firstCardId = useRef<string>("");

  const [cards, setCards] = useState(matrix);
  const [flippedCards, setFlippeCards] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [gameStarted, setGameStarted] = useState(false);

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    setCards(generateMatrix(newDifficulty));
    setFlippeCards([]);
    firstCardId.current = "";
    setGameStarted(true);
    setIsModalActive(false);
  };

  const handleNewGameStart = (): void => {
    setCards(generateMatrix(difficulty));
    setFlippeCards([]);
    firstCardId.current = "";
    setIsModalActive(false);
  };
  console.log(matrix);

  const handleClick = (rowIndex: number, index: number) => {
    const totalCards = difficulty === "normal" ? 16 : 36;

    const cardId = `${rowIndex}:${index}`;

    if (isDisabled) return;
    if (flippedCards.includes(cardId)) return;

    if (firstCardId.current === "") {
      firstCardId.current = cardId;

      console.log(firstCardId.current);

      setFlippeCards((prevValue) => [...prevValue, firstCardId.current]);
      return;
    }
    console.log(flippedCards);

    setFlippeCards((prevValue) => {
      const updateCards = [...prevValue, cardId];
      console.log(flippedCards);
      if (totalCards === updateCards.length) {
        setTimeout(() => {
          setIsModalActive(true);
          console.log(flippedCards);
        }, 100);
      }
      return updateCards;
    });
    console.log(flippedCards, totalCards);

    const [firstRow, firstIndex] = firstCardId.current.split(":").map(Number);
    const firstCard = cards[firstRow][firstIndex].value;
    const secondCard = cards[rowIndex][index].value;

    if (firstCard !== secondCard) {
      setIsDisabled(true);

      const firstCardIdRef = firstCardId.current;
      const secondCardId = cardId;

      setTimeout(() => {
        setFlippeCards((prevValue) =>
          prevValue.filter(
            (id) => id !== firstCardIdRef && id !== secondCardId,
          ),
        );
        firstCardId.current = "";
        setIsDisabled(false);
      }, 1000);
      return;
    }
    firstCardId.current = "";
  };
  return (
    <>
      <h1>Memory Game</h1>
      {!gameStarted ? (
        <WelcomeMessage />
      ) : (
        <GameBoard
          cards={cards}
          flippedCards={flippedCards}
          onCardClick={handleClick}
          difficulty={difficulty}
        />
      )}
      <DifficultyButtons onDifficultyChange={handleDifficultyChange} />
      <VictoryModal isActive={isModalActive} onNewGame={handleNewGameStart} />
    </>
  );
};

export default MemoryGame;
