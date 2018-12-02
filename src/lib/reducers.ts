import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Column, Todo, TodoComment } from "./type";
import { setBoardData, setColumn, setTodo, setComment } from "./actionCreators";

interface State {
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
  .case(setColumn, (state: State, { column }) => ({
    ...state,
    columns: [...state.columns, column]
  }))
  .case(setTodo, (state: State, { todo }) => ({
    ...state,
    todos: [...state.todos, todo]
  }))
  .case(setComment, (state: State, { comment }) => ({
    ...state,
    comments: [...state.comments, comment]
  }));

export default reducer;
