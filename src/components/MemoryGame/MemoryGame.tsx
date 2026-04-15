import React, { useRef, useState, useEffect } from 'react';
import type { Difficulty } from './MemoryGame.utils';
import { matrix, generateMatrix } from './MemoryGame.utils';
import DifficultyButtons from './DifficultyButtons';
import GameBoard from './GameBoard';
import VictoryModal from './VictoryModal';
import WelcomeMessage from './WelcomeMessage';
import Timer from './Timer';
import { useTimer } from './Timer';
import styles from '../MemoryGame/GameBoard/GameBoard.module.scss';
import BestTimes from './BestTimes';
import { useNavigate } from 'react-router-dom';

const TOTAL_NORMAL = 16;
const TOTAL_HARD = 36;
const MemoryGame: React.FC = () => {
  const [bestTimes, setBestTimes] = useState<string[]>([]);
  const [cards, setCards] = useState(matrix);
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [gameStarted, setGameStarted] = useState(false);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { displayTime, start, reset, stop } = useTimer();

  const firstCardId = useRef<string>('');

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  useEffect(() => {
    const saved = localStorage.getItem('bestTimes');
    if (saved) {
      setBestTimes(JSON.parse(saved));
    }
    return setGameStarted(false);
  }, []);

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    reset();
    setDifficulty(newDifficulty);
    setCards(generateMatrix(newDifficulty));
    setFlippedCards([]);
    firstCardId.current = '';
    setGameStarted(true);
    setIsModalActive(false);
  };

  const handleNewGameStart = (): void => {
    reset();
    setCards(generateMatrix(difficulty));
    setFlippedCards([]);
    firstCardId.current = '';
    setIsModalActive(false);
  };

  const handleClick = (rowIndex: number, index: number) => {
    const totalCards = difficulty === 'normal' ? TOTAL_NORMAL : TOTAL_HARD;

    const cardId = `${rowIndex}:${index}`;
    start();

    if (isDisabled) return;
    if (flippedCards.includes(cardId)) return;

    if (firstCardId.current === '') {
      firstCardId.current = cardId;
      setFlippedCards((prevValue) => [...prevValue, firstCardId.current]);
      return;
    }

    setFlippedCards((prevValue) => {
      const updateCards = [...prevValue, cardId];

      if (totalCards === updateCards.length) {
        stop();
        setTimeout(() => {
          if (totalCards === updateCards.length) {
            saveBestTime(displayTime);
          }
          setIsModalActive(true);
        }, 100);
      }
      return updateCards;
    });

    const [firstRow, firstIndex] = firstCardId.current.split(':').map(Number);
    const firstCard = cards[firstRow][firstIndex].value;
    const secondCard = cards[rowIndex][index].value;

    if (firstCard !== secondCard) {
      setIsDisabled(true);

      const firstCardIdRef = firstCardId.current;
      const secondCardId = cardId;

      setTimeout(() => {
        setFlippedCards((prevValue) =>
          prevValue.filter(
            (id) => id !== firstCardIdRef && id !== secondCardId,
          ),
        );
        firstCardId.current = '';
        setIsDisabled(false);
      }, 1000);
      return;
    }
    firstCardId.current = '';
  };

  const saveBestTime = (newTime: string) => {
    const timeToSeconds = (time: string): number => {
      const [mins, secs] = time.split(':').map(Number);
      return mins * 60 + secs;
    };
    const current = [...bestTimes];
    current.push(newTime);
    current.sort((a, b) => timeToSeconds(a) - timeToSeconds(b));
    const top3 = current.slice(0, 3);
    setBestTimes(top3);
    localStorage.setItem('bestTimes', JSON.stringify(top3));
  };
  return (
    <div className={styles.container}>
      <h1>Memory Game</h1>
      {!gameStarted ? (
        <>
          <WelcomeMessage />
          <DifficultyButtons onDifficultyChange={handleDifficultyChange} />
        </>
      ) : (
        <>
          <Timer displayTime={displayTime} />
          <GameBoard
            cards={cards}
            flippedCards={flippedCards}
            onCardClick={handleClick}
            difficulty={difficulty}
          />
          <BestTimes times={bestTimes} />
        </>
      )}
      <VictoryModal
        isActive={isModalActive}
        onNewGame={handleNewGameStart}
        displayTime={displayTime}
      />
      <div className={styles.recordsContainer}></div>

      <button className={styles.goBack} onClick={goBack}>
        ◀-- К выбору игры
      </button>
    </div>
  );
};

export default MemoryGame;
