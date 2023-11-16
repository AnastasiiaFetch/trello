import { create } from 'zustand';

interface ColorStore {
  color: string;
  setColor: (color: string) => void;
}

const useMainColorStore = create<ColorStore>(set => ({
  color: '#eff5fa',
  setColor: newColor =>
    set(() => ({
      color: newColor,
    })),
}));

export default useMainColorStore;
