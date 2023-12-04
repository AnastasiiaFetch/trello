import { create } from 'zustand';
import { Workspace } from '../types/workspace';

interface WorkspacesState {
  workspaces: Workspace[] | null;
  setWorkspaces: (workSpaces: Workspace[]) => void;
}

const useWorkspacesStore = create<WorkspacesState>(set => ({
  workspaces: null,
  setWorkspaces: (workspaces: Workspace[]) =>
    set({
      workspaces,
    }),
}));

export default useWorkspacesStore;
