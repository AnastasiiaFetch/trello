export interface WorkspaceMember {
  id: number;
  name: string;
  role: string;
}

export interface Workspace {
  id: number;
  name: string;
  description: string;
  members: WorkspaceMember[];
}
