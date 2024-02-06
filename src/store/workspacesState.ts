import { create } from 'zustand';
import { Workspace } from '../types/workspace';

interface WorkspacesState {
  workspaces: Workspace[] | null;
  setWorkspaces: (workSpaces: Workspace[]) => void;
  getWorkspace: (id: string) => Workspace | null;
}

const useWorkspacesStore = create<WorkspacesState>((set, get) => ({
  workspaces: null,
  setWorkspaces: (workspaces: Workspace[]) =>
    set({
      workspaces,
    }),
  getWorkspace: (id: string) => {
    if (id && get().workspaces) {
      const workspace = get()?.workspaces?.find(w => w.id === id);
      return workspace || null;
    }
    return null;
  },
}));

export default useWorkspacesStore;
