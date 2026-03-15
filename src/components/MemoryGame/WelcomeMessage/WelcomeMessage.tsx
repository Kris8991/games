import React from 'react';
import styles from './WelcomeMessage.module.scss';

const WelcomeMessage: React.FC = () => (
  <div className={styles.welcomeMessage}>
    <h2>Добро пожаловать в Memory Game!</h2>
    <p>Для начала игры выберите сложность</p>
  </div>
);

export default WelcomeMessage;
