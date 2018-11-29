export interface TodoComment {
  content: string;
  updatedAt: string;
}

export interface Label {
  color: string;
  name: string;
}

export interface Todo {
  name: string;
  detail?: string;
  comments: TodoComment[];
  limit?: string;
  label?: Label;
  id: string;
  updatedAt: string;
}

export interface Column {
  name: string;
  todos: Todo[];
  id: string;
  updatedAt: string;
}
