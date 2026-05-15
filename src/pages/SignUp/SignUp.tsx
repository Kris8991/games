import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../../stores/user';
import Button from '../../ui/Button';
import TextField from '../../ui/TextField';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const signUpSchema = z.object({
  userName: z.string().min(4, 'Минимум 4 символа'),
  email: z.email('Введите корректный email'),
  password: z
    .string()
    .min(6, 'Минимум 6 символов')
    .regex(/[A-Z]/, 'Минимум одна заглавная бука')
    .regex(/[0-9]/, 'Мниимум одна цифра'),
});
type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp: React.FC = () => {
  const { signUp } = useAuthState();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = (data: SignUpFormData) => {
    const { userName, email, password } = data;

    signUp({ email: email, name: userName, password: password }, () => {
      navigate('/sign_in');
    });
  };
  return (
    <div className="container containerAuth">
      <form onSubmit={handleSubmit(onSubmit)} className="card">
        <TextField
          label="Имя: "
          type="text"
          error={errors.userName?.message}
          {...register('userName')}
        />

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
        <Button type="submit">Зарегистрироваться</Button>
      </form>
    </div>
  );
};

export default SignUp;
