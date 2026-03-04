import styles from "./WelcomeMessage.module.css";

const WelcomeMessage = () => {
  return (
    <div className={styles.welcomeMessage}>
      <h2>Добро пожаловать в Memory Game!</h2>
      <p>Для начала игры выберите сложность</p>
    </div>
  );
};
export default WelcomeMessage;
