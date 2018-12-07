import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  KeyboardEvent,
  SyntheticEvent
} from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import InputAtom from "../../atoms/Input";
import { Todo } from "../../../lib/type";
import { ActionTypes } from "../../../lib/actionCreators";

const Container = styled.section``;
const Text = styled.h2`
  font-size: 25px;
  line-height: 20px;
`;
const Input = styled(InputAtom)`
  font-size: 25px;
  height: 25px;
  width: 100%;
`;

type TodoNameSectionProps = Todo & {
  updateTodo: (todo: Todo) => { type: ActionTypes };
};

const TodoNameSection: React.SFC<TodoNameSectionProps> = ({
  updateTodo,
  ...todo
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState(todo.name);

  const nameInputEl = useRef<HTMLInputElement>(null);

  useEffect(function() {
    if (nameInputEl && nameInputEl.current) {
      nameInputEl.current.focus();
    }
  });

  const onClickText = useCallback(function() {
    setIsTyping(true);
  }, []);

  const onKeyPressInput = useCallback(
    function(ev: KeyboardEvent<HTMLInputElement>) {
      if (ev.key === "Enter") {
        ev.preventDefault();
        updateTodo({
          ...todo,
          name: inputValue
        });
        setIsTyping(false);
      }
    },
    [inputValue]
  );

  const onChangeInput = useCallback(function(
    ev: SyntheticEvent<HTMLInputElement>
  ) {
    ev.persist();
    const value = (ev.target as any).value;
    setInputValue(() => value);
  },
  []);

  const onBlurInput = useCallback(function() {
    setIsTyping(false);
  }, []);

  return (
    <Container>
      {!isTyping ? (
        <Text onClick={onClickText}>{todo.name}</Text>
      ) : (
        <Input
          ref={nameInputEl}
          onKeyPress={onKeyPressInput}
          value={inputValue}
          onChange={onChangeInput}
          onBlur={onBlurInput}
        />
      )}
    </Container>
  );
};

export default React.memo(
  connect(
    null,
    dispatch => ({
      updateTodo: (todo: Todo) =>
        dispatch({
          type: ActionTypes.UpdateTodo,
          payload: {
            todo
          }
        })
    })
  )(TodoNameSection)
);
