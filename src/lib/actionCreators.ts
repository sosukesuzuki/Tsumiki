import actionCreatorFactory from "typescript-fsa";
import { Column, Todo, TodoComment } from "./type";

const actionCreator = actionCreatorFactory();

export enum ActionTypes {
  FetchBoardData = "FETCH_BOARD_DATA",
  SetBoardData = "SET_BOARD_DATA",
  AddColumn = "ADD_COLUMN",
  DeleteColumn = "DELETE_COLUMN",
  SetColumn = "SET_COLUMN",
  AddTodo = "ADD_TODO",
  DeleteTodo = "DELETE_TODO",
  SetTodo = "SET_TODO",
  AddComment = "ADD_COMMENT",
  DeleteComment = "DELETE_COMMENT",
  SetComment = "SET_COMMENT"
}

export const fetchBoardData = actionCreator(ActionTypes.FetchBoardData);
export const setBoardData = actionCreator<{
  columns: Column[];
  todos: Todo[];
  comments: [];
}>(ActionTypes.SetBoardData);
export const addColumn = actionCreator(ActionTypes.AddColumn);
export const deleteColumn = actionCreator(ActionTypes.DeleteColumn);
export const setColumn = actionCreator<{ column: Column }>(
  ActionTypes.SetColumn
);
export const addTodo = actionCreator<{ columnId: string }>(ActionTypes.AddTodo);
export const setTodo = actionCreator<{ todo: Todo }>(ActionTypes.SetTodo);
export const addComment = actionCreator<{ todoId: string }>(
  ActionTypes.AddComment
);
export const setComment = actionCreator<{
  comment: TodoComment;
}>(ActionTypes.SetComment);
