import { Link } from 'react-router-dom';
import styles from '../Auth/Auth.module.scss';

const Enter: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <Link to="/sign_in">
          <div>
            <button>Войти</button>
          </div>
        </Link>

        <Link to="/sign_up">
          <div className="container">
            <button>Зарегистрироваться</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Enter;
