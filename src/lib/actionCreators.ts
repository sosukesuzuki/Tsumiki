import actionCreatorFactory from "typescript-fsa";
import { Column, Todo, TodoComment } from "./type";
import { Omit } from "lodash";

const actionCreator = actionCreatorFactory();

export enum ActionTypes {
  FetchBoardData = "FETCH_BOARD_DATA",
  SetBoardData = "SET_BOARD_DATA",
  AddColumn = "ADD_COLUMN",
  DeleteColumn = "DELETE_COLUMN",
  UpdateColumn = "UPDATE_COLUMN",
  SetColumn = "SET_COLUMN",
  AddTodo = "ADD_TODO",
  DeleteTodo = "DELETE_TODO",
  SetTodo = "SET_TODO",
  AddComment = "ADD_COMMENT",
  DeleteComment = "DELETE_COMMENT",
  SetComment = "SET_COMMENT"
}

export const fetchBoardData = actionCreator.async<
  null,
  { columns: Column[]; todos: Todo[]; comments: TodoComment[] }
>(ActionTypes.FetchBoardData);

export const setBoardData = actionCreator<{
  columns: Column[];
  todos: Todo[];
  comments: [];
}>(ActionTypes.SetBoardData);

export const addColumn = actionCreator.async<null, null>(ActionTypes.AddColumn);

export const deleteColumn = actionCreator.async<{ column: Column }, null>(
  ActionTypes.DeleteColumn
);

export const updateColumn = actionCreator.async<
  {
    column: Partial<Omit<Column, "id">> & { id: string };
  },
  null
>(ActionTypes.UpdateColumn);

export const setColumn = actionCreator<{ column: Column }>(
  ActionTypes.SetColumn
);

export const addTodo = actionCreator.async<{ columnId: string }, null>(
  ActionTypes.AddTodo
);

export const deleteTodo = actionCreator.async<{ todo: Todo }, null>(
  ActionTypes.DeleteTodo
);

export const setTodo = actionCreator<{ todo: Todo }>(ActionTypes.SetTodo);

export const addComment = actionCreator.async<{ todoId: string }, null>(
  ActionTypes.AddComment
);

export const deleteComment = actionCreator.async<{ comment: Comment }, null>(
  ActionTypes.DeleteComment
);

export const setComment = actionCreator<{
  comment: TodoComment;
}>(ActionTypes.SetComment);
