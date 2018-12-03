import React, {
  useState,
  useCallback,
  useRef,
  SyntheticEvent,
  KeyboardEvent,
  useEffect
} from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Column, Todo, OnlyIdRequiredColumn } from "../../lib/type";
import colors from "../../lib/colors";
import { ActionTypes } from "../../lib/actionCreators";
import { State as RootState } from "../../lib/reducer";
import TodoComponent from "./TodoComponent";

const Container = styled.div`
  width: 200px;
  height: fit-content;
  background-color: ${colors.light};
  color: ${colors.heavy};
  margin: 0 15px;
  padding: 10px;
  overflow-x: auto;
  input {
    height: 25px;
    margin: 0;
  }
  h3 {
    cursor: pointer;
    height: 25px;
    margin: 0;
  }
`;

type ColumnComponentProps = Column & {
  todos: Todo[];
  updateColumn: (
    column: OnlyIdRequiredColumn
  ) => {
    type: ActionTypes;
  };
  addTodo: (
    { columnId }: { columnId: string }
  ) => {
    type: ActionTypes;
  };
  deleteColumn: (
    { columnId }: { columnId: string }
  ) => {
    type: ActionTypes;
  };
};

interface State {
  isTypingColumnName: boolean;
  contentInColumnNameInput?: string;
}

const ColumnComponent: React.SFC<ColumnComponentProps> = ({
  name,
  id,
  updateColumn,
  addTodo,
  todos,
  deleteColumn
}) => {
  const initialState: State = {
    isTypingColumnName: false,
    contentInColumnNameInput: name
  };

  const [state, setState] = useState(initialState);

  const columnInputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (columnInputEl && columnInputEl.current) {
      columnInputEl.current.focus();
    }
  });

  useEffect(() => {
    if (name === "")
      setState({
        ...state,
        isTypingColumnName: true
      });
  }, []);

  const onClickColumnName = useCallback(
    function() {
      if (!state.isTypingColumnName) {
        setState((state: State) => ({
          ...state,
          isTypingColumnName: true
        }));
      }
    },
    [state.isTypingColumnName]
  );

  const onKeyPressColumnNameInput = useCallback(
    function(ev: KeyboardEvent<HTMLInputElement>) {
      if (ev.key === "Enter") {
        updateColumn({
          name: state.contentInColumnNameInput,
          id
        });
        setState((state: State) => ({
          ...state,
          isTypingColumnName: false
        }));
      }
    },
    [state.contentInColumnNameInput, state.isTypingColumnName]
  );

  const onChangeColumnNameInput = useCallback(
    function(ev: SyntheticEvent<HTMLInputElement>) {
      ev.persist();
      const value = (ev.target as any).value;
      setState((state: State) => ({
        ...state,
        contentInColumnNameInput: value
      }));
    },
    [state.contentInColumnNameInput]
  );

  const onBlurColumnNameInput = useCallback(
    function() {
      const relatedTodos = todos.filter(todo => todo.columnId === id);
      if (
        relatedTodos.length === 0 &&
        contentInColumnNameInput === "" &&
        name === ""
      ) {
        deleteColumn({ columnId: id });
      }
      setState((state: State) => ({
        ...state,
        isTypingColumnName: false
      }));
    },
    [state.contentInColumnNameInput, state.isTypingColumnName, name]
  );

  const onClickAddTodoButton = useCallback(function(columnId: string) {
    addTodo({ columnId });
  }, []);

  const onClickClumnDeleteButton = useCallback(function(columnId: string) {
    deleteColumn({
      columnId
    });
  }, []);

  const { isTypingColumnName, contentInColumnNameInput } = state;
  return (
    <Container>
      <div>
        {!isTypingColumnName ? (
          <h3 onClick={onClickColumnName}>{name}</h3>
        ) : (
          <input
            type="text"
            value={contentInColumnNameInput}
            onKeyPress={onKeyPressColumnNameInput}
            onChange={onChangeColumnNameInput}
            onBlur={onBlurColumnNameInput}
            ref={columnInputEl}
          />
        )}
        <button onClick={() => onClickClumnDeleteButton(id)}>x</button>
      </div>
      <div>
        {todos
          .filter(todo => todo.columnId === id)
          .map(todo => (
            <TodoComponent {...todo} key={todo.id} />
          ))}
      </div>
      <button onClick={() => onClickAddTodoButton(id)}>
        + さらにカードを追加
      </button>
    </Container>
  );
};

export default connect(
  (state: RootState) => ({
    todos: state.todos
  }),
  dispatch => ({
    updateColumn: (column: OnlyIdRequiredColumn) =>
      dispatch({ type: ActionTypes.UpdateColumn, payload: { column } }),
    addTodo: ({ columnId }: { columnId: string }) =>
      dispatch({ type: ActionTypes.AddTodo, payload: { columnId } }),
    deleteColumn: ({ columnId }: { columnId: string }) =>
      dispatch({ type: ActionTypes.DeleteColumn, payload: { columnId } })
  })
)(ColumnComponent);
