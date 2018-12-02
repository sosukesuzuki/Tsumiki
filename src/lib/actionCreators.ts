import actionCreatorFactory from "typescript-fsa";
import { Column, Todo, TodoComment } from "./type";

const actionCreator = actionCreatorFactory();

export const fetchBoardData = actionCreator("FETCH_BOARD_DATA");
export const setBoardData = actionCreator<{
  columns: Column[];
  todos: Todo[];
  comments: [];
}>("SET_BOARD_DATA");
export const addColumn = actionCreator("ADD_COLUMN");
export const setColumn = actionCreator<{ column: Column }>("SET_COLUMN");
export const addTodo = actionCreator<{ columnId: string }>("ADD_TODO");
export const setTodo = actionCreator<{ todo: Todo }>("SET_TODO");
export const addComment = actionCreator<{ todoId: string }>("ADD_COMMENT");
export const setComment = actionCreator<{
  comment: TodoComment;
}>("SET_COMMENT");
