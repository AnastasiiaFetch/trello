import { create } from 'zustand';

interface ColorStore {
  color: string;
  setColor: (color: string) => void;
}

const useColorStore = create<ColorStore>(set => ({
  color: '#EFF5FA',
  setColor: newColor =>
    set(() => ({
      color: newColor,
    })),
}));

export default useColorStore;
