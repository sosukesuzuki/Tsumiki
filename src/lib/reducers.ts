import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Column, Todo } from "./type";
import { setBoardData, setColumn, setTodo, setComment } from "./actionCreators";
import _ from "lodash";

interface State {
  columns: Column[];
}

const initialState: State = {
  columns: []
};

const reducer = reducerWithInitialState(initialState)
  .case(setBoardData, (state: State, { columns }) => ({ ...state, columns }))
  .case(setColumn, (state: State, { column }) => ({
    ...state,
    columns: [...state.columns, column]
  }))
  .case(setTodo, (state: State, { todo }) => {})
  .case(setComment, (state: State, { comment }) => {});

export default reducer;
