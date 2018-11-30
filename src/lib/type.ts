export interface TodoComment {
  content: string;
  updatedAt: string;
  todoId: string;
  id: string;
}

export interface Label {
  color: string;
  name: string;
  id: string;
}

export interface Todo {
  name: string;
  detail?: string;
  limit?: string;
  label?: Label;
  id: string;
  updatedAt: string;
  columnId: string;
}

export interface Column {
  name: string;
  id: string;
  updatedAt: string;
}
