import { Link } from 'react-router-dom';
import styles from './Enter.module.scss';

const Enter: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Добро пожаловать!</h1>
        <p className={styles.subtitle}>
          Войдите или создайте аккаунт, чтобы продолжить
        </p>

        <div className={styles.buttonGroup}>
          <Link
            to="/sign_in"
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            Войти
          </Link>

          <Link
            to="/sign_up"
            className={`${styles.button} ${styles.buttonSecondary}`}
          >
            Зарегистрироваться
          </Link>
        </div>
        <div className={styles.footer}>Играйте в удовольствие 🎮</div>
      </div>
    </div>
  );
};

export default Enter;
