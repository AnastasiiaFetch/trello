import { create } from 'zustand';
import { User } from '../types/user';

interface UserState {
  isLoggedIn: boolean;
  currentUser: User | null;
  userToken?: string | null;
  setUserToken: (token: string) => void;
  getUserToken: () => string | null | undefined;
  setUser: (user: User) => void;
  setLoggedInUser: (isLoggedIn: boolean | undefined) => void;
  removeUser: () => void;
  setUserPhoto: (userPhoto: string) => void;
  mutateUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  isLoggedIn: false,
  userToken: '555555555555555555555555555555555',
  currentUser: null,
  setUserToken: (token: string) =>
    set(() => {
      localStorage.setItem('userToken', token);
      return { userToken: token };
    }),
  getUserToken: () => {
    const token = get().userToken;
    if (token) return token;
    const tokenLS = localStorage.getItem('userToken');
    return tokenLS;
  },
  setUser: (user: User) => set(() => ({ isLoggedIn: true, currentUser: user })),
  setLoggedInUser: (isLoggedIn: boolean | undefined) =>
    set(state => ({ isLoggedIn: isLoggedIn || !state.isLoggedIn })),
  removeUser: () => set(() => ({ currentUser: null })),
  setUserPhoto: (userPhoto: string) => {
    const user = get().currentUser;
    if (user) {
      user.userPhoto = userPhoto;
      set(() => ({ currentUser: user }));
    }
  },
  mutateUser: (user: User) =>
    set(() => ({
      currentUser: {
        ...(get().currentUser || {}),
        ...user,
      },
    })),
}));

export default useUserStore;
