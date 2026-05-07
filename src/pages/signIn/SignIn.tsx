import React, { useState } from 'react';
import { useAuthState } from '../../stores/user';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import TextField from '../../ui/TextField';

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
    <div className="container containerAuth">
      <form onSubmit={handleSubmit} className="card">
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
        <Button type="submit">Войти</Button>
      </form>
    </div>
  );
};

export default SignIn;
