export interface Card {
  id: string;
  title: string;
  description: string | null;
  listId: string;
  assignedTo: string;
  dueDate: string;
  order: number;
  checklists: any | null;
}

export interface ChecklistItem {
  id: string;
  value: string;
  isChecked: boolean;
}
export interface Checklist {
  id: string;
  key: string;
  items: ChecklistItem[];
}
