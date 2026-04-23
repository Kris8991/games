import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../../state/userState/authState';
import styles from './Auth.module.scss';

//type sign_upProps = {};

const Sign_up: React.FC = () => {
  const { user, getItem, signUp, setUser } = useAuthState();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);

    const savedUser = getItem('user');
    if (savedUser) {
      setUser(savedUser);
      console.log(savedUser);
    }
  }, []);
  console.log(user);
  const handleLogin = () => {
    signUp({ email: 'p', name: 'n' }, () => {
      navigate('/sign_in');
    });
  };
  return (
    <div className={styles.container}>
      <form>
        <label>
          Name: <input name="username" />
        </label>
        <label>
          Email: <input name="Email" />
        </label>
        <label>
          Password: <input name="Password" />
        </label>
        <button onClick={handleLogin}>Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Sign_up;
