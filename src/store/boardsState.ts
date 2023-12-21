import { create } from 'zustand';
import { Board } from '../types/board';

interface BoardsState {
  boards: Board[] | null;
  setBoards: (workSpaces: Board[]) => void;
  getBoards: (id: string) => Board[] | null;
}

const useBoardsStore = create<BoardsState>((set, get) => ({
  boards: null,
  setBoards: (boards: Board[]) =>
    set({
      boards,
    }),
  getBoards: id => {
    if (id && get().boards) {
      const workSpaceBoards = get()?.boards?.filter(b => b.workspaceId === id);
      return workSpaceBoards || null;
    }
    return null;
  },
}));

export default useBoardsStore;
