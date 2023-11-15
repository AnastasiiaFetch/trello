import { create } from 'zustand';

interface ColorStore {
  color: string;
  setColor: (color: string) => void;
}

const useMainColorStore = create<ColorStore>(set => ({
  color: '#f2f2f2',
  setColor: newColor =>
    set(() => ({
      color: newColor,
    })),
}));

export default useMainColorStore;
