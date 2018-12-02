import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Column, Todo, TodoComment } from "./type";
import { setBoardData, setColumn, setTodo, setComment } from "./actionCreators";
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
  .case(setColumn, (state: State, { column }) => {
    const res = _.find(state.columns, ({ id }: Column) => id === column.id);
    if (res == null) {
      return {
        ...state,
        columns: [...state.columns, column]
      };
    } else {
      const { columns } = state;
      const newColumns = columns.map(stateColumn => {
        if (stateColumn.id === column.id) {
          return column;
        }
        return stateColumn;
      });
      return {
        ...state,
        columns: newColumns
      };
    }
  })
  .case(
    setTodo,
    (state: State, { todo }): State => {
      const res = _.find(state.todos, ({ id }: Todo) => id === todo.id);
      if (res == null) {
        return {
          ...state,
          todos: [...state.todos, todo as Todo]
        };
      } else {
        const { todos } = state;
        const newTodos = todos.map(stateTodo => {
          if (stateTodo.id === todo.id) {
            return todo;
          }
          return stateTodo;
        });
        return {
          ...state,
          todos: newTodos
        };
      }
    }
  )
  .case(setComment, (state: State, { comment }) => ({
    ...state,
    comments: [...state.comments, comment]
  }));

export default reducer;
