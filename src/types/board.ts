export interface List {
  id: string;
  title: string;
  boardId: string;
  order: number;
}

export interface Card {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  listId: string;
  order: number;
}

export interface Board {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  isSelected: boolean;
  createdAt: string;
  color: string | null;
  lists: List[] | null;
  cards: Card[] | null;
}

export interface BoardItem {
  id: string;
  name: string;
  cards: Card[] | null;
}
