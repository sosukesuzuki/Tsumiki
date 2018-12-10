import uuid from "uuid/v1";
import { Column, Label, TodoComment, Todo } from "./types";

function getDate(): string {
  return Date.now().toString();
}

export function generateColumn({ name }: { name: string }): Column {
  return {
    name,
    id: uuid(),
    updatedAt: getDate()
  };
}

export function generateTodo({
  name,
  detail,
  limit,
  label,
  columnId
}: {
  name: string;
  detail?: string;
  limit?: string;
  label?: Label;
  columnId: string;
}): Todo {
  return {
    name,
    detail,
    limit,
    label,
    columnId,
    id: uuid(),
    updatedAt: getDate()
  };
}

export function generateComment({
  content,
  todoId
}: {
  content: string;
  todoId: string;
}): TodoComment {
  return {
    content,
    todoId,
    id: uuid(),
    updatedAt: getDate()
  };
}
