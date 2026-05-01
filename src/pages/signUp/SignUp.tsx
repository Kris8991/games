import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../../stores/user';
import styles from '../../styles/global.module.scss';
import Button from '../../ui/Button';
import TextField from '../../ui/TextField/TextField';

const SignUp: React.FC = () => {
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
    <div className={`${styles.container} ${styles.containerAuth}`}>
      <form onSubmit={handleSubmit} className={styles.card}>
        <TextField
          label="Имя: "
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
        />

        <TextField
          label="Email: "
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Пароль: "
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit">Зарегистрироваться</Button>
      </form>
    </div>
  );
};

export default SignUp;
