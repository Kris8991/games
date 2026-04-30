import { useNavigate } from 'react-router-dom';
import styles from './Enter.module.scss';
import Button from '../../ui/button';

const Enter: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Добро пожаловать!</h1>
        <p className={styles.subtitle}>
          Войдите или создайте аккаунт, чтобы продолжить
        </p>
        <div className={styles.buttonGroup}>
          <Button children={'Войти'} onClick={() => navigate('/sign_in')} />
          <Button
            children={'Зарегистрироваться'}
            variant="secondary"
            onClick={() => navigate('/sign_up')}
          />
        </div>
        <div className={styles.footer}>Играйте в удовольствие 🎮</div>
      </div>
    </div>
  );
};

export default Enter;
