import { create } from 'zustand';

export type User = {
  email: string;
  name: string;
};
export type UserWithPassword = {
  email: string;
  name: string;
  password: string;
};
export type AuthState = {
  user: User | null;
  getUser(): User | null;
  signOut(): void;
  signIn(email: string, password: string): User | null;
  signUp(user: UserWithPassword, cb: () => void): void;
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

    getUser: () => {
      const storedUser = localStorage.getItem('user');

      if (storedUser) {
        const user = JSON.parse(storedUser) as User;
        set({ user });
        return user;
      }
      return null;
    },
    signOut: () => {
      localStorage.removeItem('user');
      set({ user: null });
    },

    signIn: (email, password) => {
      const existingUsers = localStorage.getItem('users');
      const usersArray = existingUsers ? JSON.parse(existingUsers) : [];
      const foundedUser = usersArray.find(
        (user: UserWithPassword) => user.email === email,
      );
      if (foundedUser && foundedUser.password === password) {
        const publicUser = { email: foundedUser.email, name: foundedUser.name };
        localStorage.setItem('user', JSON.stringify(publicUser));
        set({ user: publicUser });

        return publicUser;
      }
      return null;
    },
    signUp: (user: UserWithPassword, cb) => {
      const existingUsers = localStorage.getItem('users');
      const usersArray = existingUsers ? JSON.parse(existingUsers) : [];
      usersArray.push(user);

      localStorage.setItem('users', JSON.stringify(usersArray));
      cb();
    },
  };
});
