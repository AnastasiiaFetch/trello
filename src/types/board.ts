import { Card } from './card';
import { Label } from './label';
import { List } from './list';
import { User } from './user';

export interface Board {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  isSelected: boolean;
  createdAt: string;
  color: string;
  lists: List[] | null;
  cards: Card[] | null;
  labels: Label[];
  user: User;
}

export type BoardItem = List & {
  cards: Card[] | null;
};
