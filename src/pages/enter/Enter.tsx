import { useNavigate } from 'react-router-dom';
import styles from './Enter.module.scss';
import Button from '../../ui/Button';

const Enter: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="containerAuth container">
      <div className="card">
        <h1 className={styles.title}>Добро пожаловать!</h1>
        <p className={styles.subtitle}>
          Войдите или создайте аккаунт, чтобы продолжить
        </p>
        <div className={styles.buttonGroup}>
          <Button onClick={() => navigate('/sign_in')}>Войти </Button>
          <Button variant="secondary" onClick={() => navigate('/sign_up')}>
            Зарегистрироваться
          </Button>
        </div>
        <div className={styles.footer}>Играйте в удовольствие 🎮</div>
      </div>
    </div>
  );
};

export default Enter;
