import React from 'react';
import styles from './Timer.module.scss';

type TimerProps = {
  displayTime: string;
};
const Timer: React.FC<TimerProps> = ({ displayTime }) => {
  return (
    <div className={styles.timer}>
      <span className={styles.icon}>⏱️</span>
      <span className={styles.time}>{displayTime}</span>
    </div>
  );
};

export default Timer;
