import actionCreatorFactory from "typescript-fsa";
import {
  Column,
  Todo,
  TodoComment,
  UpdateDiffColumn,
  UpdateDiffTodo,
  UpdateDiffComment
} from "./types";

const actionCreator = actionCreatorFactory();

export enum ActionTypes {
  FetchBoardData = "FETCH_BOARD_DATA",
  SetBoardData = "SET_BOARD_DATA",
  AddColumn = "ADD_COLUMN",
  DeleteColumn = "DELETE_COLUMN",
  UpdateColumn = "UPDATE_COLUMN",
  SetNewColumn = "SET_NEW_COLUMN",
  SetUpdatedColumn = "SET_UPDATED_COLUMN",
  AddTodo = "ADD_TODO",
  DeleteTodo = "DELETE_TODO",
  UpdateTodo = "UPDATE_TODO",
  SetNewTodo = "SET_NEW_TODO",
  SetUpdatedTodo = "SET_UPDATED_TODO",
  AddComment = "ADD_COMMENT",
  DeleteComment = "DELETE_COMMENT",
  UpdateComment = "UPDATE_COMMENT",
  SetNewComment = "SET_NEW_COMMENT",
  SetUpdatedComment = "SET_UPDATED_COMMENT"
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

export const updateColumn = actionCreator.async<{ column: Column }, null>(
  ActionTypes.UpdateColumn
);

export const setNewColumn = actionCreator<{ column: Column }>(
  ActionTypes.SetNewColumn
);

export const setUpdatedColumn = actionCreator<{
  id: string;
  diff: UpdateDiffColumn;
}>(ActionTypes.SetUpdatedColumn);

export const addTodo = actionCreator.async<{ columnId: string }, null>(
  ActionTypes.AddTodo
);

export const deleteTodo = actionCreator.async<{ todo: Todo }, null>(
  ActionTypes.DeleteTodo
);

export const updateTodo = actionCreator.async<{ todo: Todo }, null>(
  ActionTypes.UpdateTodo
);

export const setNewTodo = actionCreator<{ todo: Todo }>(ActionTypes.SetNewTodo);

export const setUpdatedTodo = actionCreator<{
  id: string;
  diff: UpdateDiffTodo;
}>(ActionTypes.SetUpdatedTodo);

export const addComment = actionCreator.async<
  { todoId: string; content: string },
  null
>(ActionTypes.AddComment);

export const deleteComment = actionCreator.async<{ comment: Comment }, null>(
  ActionTypes.DeleteComment
);

export const setNewComment = actionCreator<{
  comment: TodoComment;
}>(ActionTypes.SetNewComment);

export const setUpdatedComment = actionCreator<{
  id: string;
  diff: UpdateDiffComment;
}>(ActionTypes.SetUpdatedComment);
