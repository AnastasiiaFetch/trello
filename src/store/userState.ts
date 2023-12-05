import { create } from 'zustand';
import { User } from '../types/user';

interface UserState {
  isLoggedIn: boolean;
  currentUser: User | null;
  setUserToken: (token: string) => void;
  getUserToken: () => string | null;
  setUser: (user: User) => void;
  setLoggedInUser: (isLoggedIn: boolean | undefined) => void;
  removeUser: () => void;
  setUserPhoto: (userPhoto: string) => void;
  updateUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  isLoggedIn: false,
  currentUser: null,
  setUserToken: (token: string) => {
    if (token) {
      localStorage.setItem('userToken', token);
    }
  },
  getUserToken: () => {
    const tokenLS = localStorage.getItem('userToken');
    return 'dddddddddd';
    // return tokenLS || null;
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
  updateUser: (user: User) =>
    set(() => ({
      currentUser: {
        ...(get().currentUser || {}),
        ...user,
      },
    })),
}));

export default useUserStore;
