import React from 'react';
import styles from './BestTimes.module.scss';
type BestTimesProps = {
  times: string[];
};

const BestTimes: React.FC<BestTimesProps> = ({ times }) => {
  return (
    <div className={styles.recordsContainer}>
      <h3>Лучшие результаты</h3>
      {times.length === 0 ? (
        <p>Пока нет рекордов</p>
      ) : (
        <div className={styles.list}>
          {times.map((time, index) => (
            <div key={index} className={styles.item}>
              <span className={styles.time}>{time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BestTimes;
