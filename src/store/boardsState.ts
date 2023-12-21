import { create } from 'zustand';
import { Board } from '../types/board';

interface BoardsState {
  boards: Board[] | null;
  setBoards: (boards: Board[]) => void;
  getBoards: (workspaceId: string) => Board[] | null;
}

const useBoardsStore = create<BoardsState>((set, get) => ({
  boards: null,
  setBoards: (boards: Board[]) =>
    set({
      boards,
    }),
  getBoards: workspaceId => {
    if (workspaceId && get().boards) {
      const workSpaceBoards = get()?.boards?.filter(b => b.workspaceId === workspaceId);
      return workSpaceBoards || null;
    }
    return null;
  },
}));

export default useBoardsStore;
