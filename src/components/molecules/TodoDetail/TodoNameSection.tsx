import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  KeyboardEvent,
  SyntheticEvent
} from "react";
import styled from "styled-components";
import InputAtom from "../../atoms/Input";

const Container = styled.section``;
const Text = styled.h2`
  font-size: 25px;
  line-height: 20px;
  cursor: pointer;
`;
const Input = styled(InputAtom)`
  font-size: 25px;
  height: 25px;
  width: 100%;
`;

interface Props {
  name: string;
  updateTodoName: (name: string) => void;
}

const TodoNameSection: React.SFC<Props> = ({ name, updateTodoName }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState(name);

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
        updateTodoName(inputValue);
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
        <Text onClick={onClickText}>{name}</Text>
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

export default React.memo(TodoNameSection);
