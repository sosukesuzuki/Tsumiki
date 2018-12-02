import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Todo } from "../../lib/type";
import colors from "../../lib/colors";
import TodoDetail from "./TodoDetail";

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

type TodoComponentProps = Todo & {};

interface State {
  isShownTodoModal: boolean;
}

const initialState: State = {
  isShownTodoModal: false
};

const TodoComponent: React.SFC<TodoComponentProps> = (todo: Todo) => {
  const { name } = todo;
  const [state, setState] = useState(initialState);
  const onClickTodoComponent = useCallback(
    function() {
      setState((state: State) => ({
        ...state,
        isShownTodoModal: true
      }));
    },
    [state.isShownTodoModal]
  );

  const onClickTodoModal = useCallback(function() {
    setState((state: State) => ({
      ...state,
      isShownTodoModal: false
    }));
  }, []);

  const { isShownTodoModal } = state;
  return (
    <>
      <Container onClick={onClickTodoComponent}>
        <h4>{name || "名前はありません"}</h4>
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

export default TodoComponent;
