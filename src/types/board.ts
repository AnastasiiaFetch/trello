import { Card } from './card';
import { List } from './list';

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

export type BoardItem = List & {
  cards: Card[] | null;
};
