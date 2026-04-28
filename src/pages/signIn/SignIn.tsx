import React, { useState } from 'react';
import styles from '../Auth.module.scss';
import { useAuthState } from '../../stores/user/index';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/button/button';

const SignIn: React.FC = () => {
  const [formData, setformData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const { signIn, setUser } = useAuthState();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email } = formData;
    const { password } = formData;

    const user = signIn(email, password);
    if (user) {
      setUser(user);
      navigate('/');
    } else {
      console.log('error');
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label>
          Email:{' '}
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:{' '}
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <Button children={'Войти'} type="submit" />
      </form>
    </div>
  );
};

export default SignIn;
