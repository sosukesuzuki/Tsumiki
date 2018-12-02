import Dexie from "dexie";
import { Column, Todo, TodoComment } from "./type";

class DB extends Dexie {
  columns!: Dexie.Table<Column, string>;
  todos!: Dexie.Table<Todo, string>;
  comments!: Dexie.Table<TodoComment, string>;

  constructor() {
    super("TodosDatabase");
    this.version(1).stores({
      columns: "id, name, updatedAt",
      todos: "id, name, updatedAt, columnId",
      comments: "id, content, updatedAt, todoId"
    });
  }
}

const db = new DB();

export async function getData(): Promise<{
  columns: Column[];
  todos: Todo[];
  comments: TodoComment[];
}> {
  const columns = await db.columns.toArray();
  const todos = await db.todos.toArray();
  const comments = await db.comments.toArray();
  return {
    columns,
    todos,
    comments
  };
}

export async function addColumn(column: Column): Promise<string> {
  return await db.columns.add(column);
}

export async function addTodo(todo: Todo): Promise<string> {
  return await db.todos.add(todo);
}

export async function addComments(comment: TodoComment): Promise<string> {
  return await db.comments.add(comment);
}
