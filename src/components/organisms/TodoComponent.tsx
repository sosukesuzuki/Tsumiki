import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  SyntheticEvent,
  KeyboardEvent
} from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Todo } from "../../lib/type";
import colors from "../../lib/colors";
import TodoDetail from "./TodoDetail";
import { ActionTypes } from "../../lib/actionCreators";

const Container = styled.div`
  margin: 5px 0;
  background-color: ${colors.light};
  border: 1px solid ${colors.heavy};
`;
const TodoModal = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 0;
`;
const TodoNameInput = styled.input``;

type TodoComponentProps = Todo & {
  deleteTodo: (
    { todoId }: { todoId: string }
  ) => {
    type: ActionTypes;
  };
  updateTodo: (
    { todo }: { todo: Todo }
  ) => {
    type: ActionTypes;
  };
};

interface State {
  isShownTodoModal: boolean;
  isTypingTodoName: boolean;
}

const TodoComponent: React.SFC<TodoComponentProps> = ({
  deleteTodo,
  updateTodo,
  ...todo
}) => {
  const { name } = todo;

  const initialState: State = {
    isShownTodoModal: false,
    isTypingTodoName: name === ""
  };

  const todoNameInputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoNameInputEl && todoNameInputEl.current) {
      todoNameInputEl.current.focus();
    }
  });

  useEffect(function() {
    if (name === "")
      setState((state: State) => ({
        ...state,
        isTypingTodoName: true
      }));
  }, []);

  const [{ isShownTodoModal, isTypingTodoName }, setState] = useState(
    initialState
  );

  const onClickTodoComponent = useCallback(function() {
    isTypingTodoName ||
      setState((state: State) => ({
        ...state,
        isShownTodoModal: true
      }));
  }, []);

  const onClickTodoModal = useCallback(
    function() {
      setState((state: State) => ({
        ...state,
        isShownTodoModal: false
      }));
    },
    [isTypingTodoName]
  );

  const onBlurTodoNameInput = useCallback(
    function() {
      deleteTodo({ todoId: todo.id });
    },
    [todo.id]
  );

  const onKeyPressTodoNameInput = useCallback(function(
    ev: KeyboardEvent<HTMLInputElement>
  ) {
    if (ev.key === "Enter") {
      updateTodo({
        todo: {
          ...todo,
          name: todoNameInputEl.current!.value
        }
      });
      setState((state: State) => ({
        ...state,
        isTypingTodoName: false
      }));
    }
  },
  []);

  return (
    <>
      <Container onClick={onClickTodoComponent}>
        {!isTypingTodoName ? (
          <h4>{name || "名前はありません"}</h4>
        ) : (
          <TodoNameInput
            type="text"
            ref={todoNameInputEl}
            onBlur={onBlurTodoNameInput}
            onKeyPress={onKeyPressTodoNameInput}
          />
        )}
      </Container>
      {isShownTodoModal && (
        <>
          <TodoModal onClick={onClickTodoModal} />
          <TodoDetail {...todo} />
        </>
      )}
    </>
  );
};

export default connect(
  null,
  dispatch => ({
    deleteTodo: ({ todoId }: { todoId: string }) =>
      dispatch({ type: ActionTypes.DeleteTodo, payload: { todoId } }),
    updateTodo: ({ todo }: { todo: Todo }) =>
      dispatch({ type: ActionTypes.UpdateTodo, payload: { todo } })
  })
)(TodoComponent);
