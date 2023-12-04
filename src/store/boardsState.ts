import { create } from 'zustand';
import { Board } from '../types/board';

interface BoardsState {
  boards: Board[] | null;
  setBoards: (workSpaces: Board[]) => void;
}

const useBoardsStore = create<BoardsState>(set => ({
  boards: null,
  setBoards: (boards: Board[]) =>
    set({
      boards,
    }),
}));

export default useBoardsStore;
