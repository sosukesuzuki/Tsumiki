import actionCreatorFactory from "typescript-fsa";
import { Column, Todo, TodoComment } from "./type";

const actionCreator = actionCreatorFactory();

export const fetchBoardData = actionCreator("FETCH_BOARD_DATA");
export const setBoardData = actionCreator<{ bord: Column[] }>("SET_BOARD_DATA");
export const addColumn = actionCreator("ADD_COLUMN");
export const setColumn = actionCreator<{ column: Column }>("SET_COLUMN");
export const addTodo = actionCreator("ADD_TODO");
export const setTodo = actionCreator<{ todo: Todo }>("SET_TODO");
export const addComment = actionCreator("ADD_COMMENT");
export const setComment = actionCreator<{ comment: TodoComment }>(
  "SET_COMMENT"
);
