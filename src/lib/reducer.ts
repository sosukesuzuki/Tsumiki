import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Column, Todo, TodoComment } from "./types";
import {
  setBoardData,
  setNewColumn,
  setUpdatedColumn,
  setNewTodo,
  setNewComment,
  setUpdatedTodo,
  setUpdatedComment
} from "./actionCreators";
import _ from "lodash";

export interface State {
  columns: Column[];
  todos: Todo[];
  comments: TodoComment[];
}

const initialState: State = {
  columns: [],
  todos: [],
  comments: []
};

const reducer = reducerWithInitialState(initialState)
  .case(setBoardData, (state: State, { columns, todos, comments }) => ({
    ...state,
    columns,
    todos,
    comments
  }))
  .case(setNewColumn, (state: State, { column }) => ({
    ...state,
    columns: [...state.columns, column]
  }))
  .case(setUpdatedColumn, (state: State, { id, diff }) => {
    const { columns } = state;
    const newColumns = columns.map(column => {
      if (column.id === id) {
        const newColumn: Column = column;
        if (typeof diff.name === "string") newColumn.name = diff.name;
        if (typeof diff.updatedAt === "string")
          newColumn.updatedAt = diff.updatedAt;
        return newColumn;
      }
      return column;
    });
    return {
      ...state,
      columns: newColumns
    };
  })
  .case(setNewTodo, (state: State, { todo }) => ({
    ...state,
    todos: [...state.todos, todo as Todo]
  }))
  .case(setUpdatedTodo, (state: State, { id, diff }) => {
    const { todos } = state;
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        const newTodo = todo;
        if (typeof diff.columnId === "string") newTodo.columnId = diff.columnId;
        if (typeof diff.detail === "string") newTodo.detail = diff.detail;
        if (diff.label != null) newTodo.label = diff.label;
        if (typeof diff.limit === "string") newTodo.limit = diff.limit;
        if (typeof diff.name === "string") newTodo.name = diff.name;
        if (typeof diff.updatedAt === "string")
          newTodo.updatedAt = diff.updatedAt;
        return newTodo;
      }
      return todo;
    });
    return {
      ...state,
      todos: newTodos
    };
  })
  .case(setNewComment, (state: State, { comment }) => ({
    ...state,
    comments: [...state.comments, comment]
  }))
  .case(setUpdatedComment, (state: State, { id, diff }) => {
    const { comments } = state;
    const newComments = comments.map(comment => {
      if (comment.id === id) {
        const newComment = comment;
        if (diff.content != null) newComment.content = diff.content;
        if (diff.todoId != null) newComment.todoId = diff.todoId;
        if (diff.updatedAt != null) newComment.updatedAt = diff.updatedAt;
        return newComment;
      }
      return comment;
    });
    return {
      ...state,
      comments: newComments
    };
  });

export default reducer;
