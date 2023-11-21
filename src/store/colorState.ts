import { create } from 'zustand';
import theme from '../theme';

interface ColorStore {
  color: string;
  setColor: (color: string) => void;
}

const useColorStore = create<ColorStore>(set => ({
  color: theme.colors.basic,
  setColor: newColor =>
    set(() => ({
      color: newColor,
    })),
}));

export default useColorStore;
