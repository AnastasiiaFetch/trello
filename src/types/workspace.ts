export interface WorkspaceMember {
  id: string;
  name: string;
  role: string;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  workspaceType: string;
  members: WorkspaceMember[];
}
