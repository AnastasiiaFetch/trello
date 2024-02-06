import { create } from 'zustand';

interface ColorStore {
  color: string;
  setColor: (color: string) => void;
}

const useColorStore = create<ColorStore>(set => ({
  color: '#EEEFFB',
  setColor: newColor =>
    set(() => ({
      color: newColor,
    })),
}));

export default useColorStore;
