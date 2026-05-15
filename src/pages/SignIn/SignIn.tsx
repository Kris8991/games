import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../../stores/user';
import Button from '../../ui/Button';
import TextField from '../../ui/TextField';
import styles from './SignIn.module.scss';
const signInSchema = z.object({
  email: z.email('Введите корректный email'),
  password: z.string().min(1, 'Введите пароль'),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuthState();
  const [authError, setAuthError] = useState<string | null>(null); // 👈 для ошибки авторизации

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setAuthError(null);

    const { email, password } = data;
    const user = signIn(email, password);

    if (user) {
      navigate('/');
    } else {
      setAuthError('Неверный email или пароль');
    }
  };

  return (
    <div className="container containerAuth">
      <form onSubmit={handleSubmit(onSubmit)} className="card">
        {authError && <div className={styles.authError}>{authError}</div>}

        <TextField
          label="Email: "
          type="email"
          error={errors.email?.message}
          {...register('email')}
        />

        <TextField
          label="Пароль: "
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit">{isSubmitting ? 'Вход...' : 'Войти'}</Button>
      </form>
    </div>
  );
};

export default SignIn;
