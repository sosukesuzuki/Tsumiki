import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  KeyboardEvent
} from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Todo, UpdateDiffTodo } from "../../../lib/types";
import colors from "../../../lib/colors";
import TodoDetail from "../../organisms/TodoDetail";
import { ActionTypes } from "../../../lib/actionCreators";
import Textarea from "../../atoms/Textarea";

const Container = styled.div`
  margin: 5px 0;
  background-color: ${colors.light};
  border: 1px solid ${colors.middle};
  height: 45px;
  transition: 0.1s;
  padding: 15px;
  cursor: pointer;
  h4 {
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:hover {
    transition: 0.1s;
    background-color: rgba(168, 168, 168, 0.1);
  }
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
const TodoNameTextarea = styled(Textarea)`
  width: 100%;
  margin: 5px 0;
  height: 60px;
`;

type Props = Todo & {
  deleteTodo: (todoId: string) => { type: ActionTypes };
  updateTodo: (id: string, diff: UpdateDiffTodo) => { type: ActionTypes };
};

interface State {
  isShownTodoModal: boolean;
  isTypingTodoName: boolean;
}

const TodoComponent: React.SFC<Props> = ({
  deleteTodo,
  updateTodo,
  ...todo
}) => {
  const { name } = todo;

  const initialState: State = {
    isShownTodoModal: false,
    isTypingTodoName: name === ""
  };

  const todoNameTextareaEl = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (todoNameTextareaEl && todoNameTextareaEl.current) {
      todoNameTextareaEl.current.focus();
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

  const onBlurTodoNameTextarea = useCallback(
    function() {
      deleteTodo(todo.id);
    },
    [todo.id]
  );

  const onKeyPressTodoNameTextarea = useCallback(
    function(ev: KeyboardEvent<HTMLTextAreaElement>) {
      if (ev.key === "Enter") {
        updateTodo(todo.id, {
          name: todoNameTextareaEl.current!.value
        });
        setState((state: State) => ({
          ...state,
          isTypingTodoName: false
        }));
      }
    },
    [todo.id]
  );

  return (
    <>
      {!isTypingTodoName ? (
        <Container onClick={onClickTodoComponent}>
          <h4>{name || "名前はありません"}</h4>
        </Container>
      ) : (
        <TodoNameTextarea
          ref={todoNameTextareaEl}
          onBlur={onBlurTodoNameTextarea}
          onKeyPress={onKeyPressTodoNameTextarea}
        />
      )}
      {isShownTodoModal && (
        <>
          <TodoModal onClick={onClickTodoModal} />
          <TodoDetail {...todo} />
        </>
      )}
    </>
  );
};

export default React.memo(
  connect(
    null,
    dispatch => ({
      deleteTodo: (todoId: string) =>
        dispatch({ type: ActionTypes.DeleteTodo, payload: { todoId } }),
      updateTodo: (id: string, diff: UpdateDiffTodo) =>
        dispatch({ type: ActionTypes.UpdateTodo, payload: { id, diff } })
    })
  )(TodoComponent)
);
