export interface List {}

export interface Card {}

export interface Board {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  isSelected: boolean;
  createdAt: string;
  color: string | null;
  lists: any;
  cards: any;
}
