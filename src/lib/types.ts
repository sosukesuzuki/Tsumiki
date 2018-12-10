import { Omit } from "lodash";

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

type OtherThanId<Item extends { id: string }> = Omit<Item, "id">;

export type UpdateDiffColumn = Partial<OtherThanId<Column>>;
export type UpdateDiffTodo = Partial<OtherThanId<Todo>>;
export type UpdateDiffComment = Partial<OtherThanId<TodoComment>>;
