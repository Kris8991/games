import { makeAutoObservable } from 'mobx';
import type { Difficulty } from '../../components/MemoryGame/MemoryGame.utils';

class memoryState {
  bestTimes: string[] = [];
  gameStarted: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }
  difficulty: Difficulty = 'normal';
  isModalActive: boolean = false;
  isDisabled: boolean = false;
  flippedCards: string[] = [];

  f = (time: string) => {
    this.bestTimes = JSON.parse(time);
  };
  so = (record: string[]) => {
    this.bestTimes = record;
  };
  g = (bool: boolean) => {
    this.gameStarted = bool;
  };
  c = (difficulty: Difficulty) => {
    this.difficulty = difficulty;
  };
  cm = (bool: boolean) => {
    this.isModalActive = bool;
  };
  cd = (bool: boolean) => {
    this.isDisabled = bool;
  };
}

export default new memoryState();
