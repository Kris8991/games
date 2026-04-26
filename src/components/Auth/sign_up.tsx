import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../../state/userState/authState';
import styles from './Auth.module.scss';

//type sign_upProps = {};

const Sign_up: React.FC = () => {
  const [formData, setformData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { signUp } = useAuthState();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const username = (form.elements.namedItem('username') as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)
      .value;

    signUp({ email: email, name: username, password: password }, () => {});
    navigate('/sign_in');
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label>
          Name:{' '}
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
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
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Sign_up;
