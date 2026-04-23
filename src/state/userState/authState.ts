import { create } from 'zustand';

type User = {
  email: string;
  name: string;
};
type AuthState = {
  user: User | null;
  getItem(key: string): User | null;
  signUp(user: User | null, cb: () => void): void;
  setUser(user: User | null): void;
};

export const useAuthState = create<AuthState>((set) => {
  const storedUser = localStorage.getItem('user');
  const initialUser = storedUser ? (JSON.parse(storedUser) as User) : null;
  return {
    user: initialUser,

    setUser: (user: User | null) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
      set({ user });
    },

    getItem: (key) => {
      const storedUser = localStorage.getItem(key);

      if (storedUser) {
        const user = JSON.parse(storedUser) as User;
        set({ user });
        return user;
      }
      return null;
    },
    //signIn: (email) => достает всех юзеров ищет по почте юзера, если нашел,то сравнивает пароли, если не совпадают то ошибка
    signUp: (user: User, cb) => {
      localStorage.setItem('user', JSON.stringify(user));
      set({ user });
      cb();
    },
  };
});
