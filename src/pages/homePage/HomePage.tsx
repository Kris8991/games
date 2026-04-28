import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePages.module.scss';
import ExitButton from '../../components/exitButton/ExitButton';

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <ExitButton />
      <h1>Выберите игру</h1>
      <div className={styles.homeContent}>
        <div className={styles.links}>
          <Link to="/memory">
            <div className={styles.imgContainer}>
              <img src="/images/prev.jpg" alt="" />
            </div>
          </Link>

          <Link to="/sudoku">
            <div className={styles.imgContainer}>
              <img src="/images/sudoku.jpg" alt="" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
