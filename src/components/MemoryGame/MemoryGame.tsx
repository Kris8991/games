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
import memoryState from '../../state/gameState/memoryState';
import { observer } from 'mobx-react-lite';

const TOTAL_NORMAL = 16;
const TOTAL_HARD = 36;
const MemoryGame: React.FC = observer(() => {
  const { displayTime, start, reset, stop } = useTimer();
  const firstCardId = useRef<string>('');
  const [cards, setCards] = useState(matrix);
  const [flippedCards, setFlippeCards] = useState<string[]>([]);

  const {
    bestTimes,
    f,
    so,
    gameStarted,
    g,
    difficulty,
    c,
    isModalActive,
    cm,
    isDisabled,
    cd,
  } = memoryState;

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  useEffect(() => {
    const saved = localStorage.getItem('bestTimes');
    if (saved) {
      f(saved);
    }
    return () => g(false);
  }, [f, g]);

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    reset();
    c(newDifficulty);
    setCards(generateMatrix(newDifficulty));
    setFlippeCards([]);
    firstCardId.current = '';
    g(true);
    cm(false);
  };

  const handleNewGameStart = (): void => {
    reset();
    setCards(generateMatrix(difficulty));
    setFlippeCards([]);
    firstCardId.current = '';
    cm(false);
  };

  const handleClick = (rowIndex: number, index: number) => {
    const totalCards = difficulty === 'normal' ? TOTAL_NORMAL : TOTAL_HARD;

    const cardId = `${rowIndex}:${index}`;
    start();

    if (isDisabled) return;
    if (flippedCards.includes(cardId)) return;

    if (firstCardId.current === '') {
      firstCardId.current = cardId;
      setFlippeCards((prevValue) => [...prevValue, firstCardId.current]);
      return;
    }

    setFlippeCards((prevValue) => {
      const updateCards = [...prevValue, cardId];

      if (totalCards === updateCards.length) {
        stop();
        setTimeout(() => {
          if (totalCards === updateCards.length) {
            saveBestTime(displayTime);
          }
          cm(true);
        }, 100);
      }
      return updateCards;
    });

    const [firstRow, firstIndex] = firstCardId.current.split(':').map(Number);
    const firstCard = cards[firstRow][firstIndex].value;
    const secondCard = cards[rowIndex][index].value;

    if (firstCard !== secondCard) {
      cd(true);

      const firstCardIdRef = firstCardId.current;
      const secondCardId = cardId;

      setTimeout(() => {
        setFlippeCards((prevValue) =>
          prevValue.filter(
            (id) => id !== firstCardIdRef && id !== secondCardId,
          ),
        );
        firstCardId.current = '';
        cd(false);
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
    so(top3);
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
});

export default MemoryGame;
