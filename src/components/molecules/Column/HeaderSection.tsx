import React, {
  useState,
  useCallback,
  SyntheticEvent,
  useRef,
  useEffect,
  KeyboardEvent
} from "react";
import styled from "styled-components";
import Input from "../../atoms/Input";
import IconButton from "../../atoms/IconButton";
import { Todo } from "../../../lib/type";

const Container = styled.section`
  display: flex;
  justify-content: space-between;
`;
const NameText = styled.h3`
  margin: 0;
  font-size: 17px;
  line-height: 20px;
  width: 170px;
  height: 20px;
  cursor: pointer;
`;
const NameInput = styled(Input)`
  width: 170px;
`;
const DeleteButton = styled(IconButton)``;

interface Props {
  name: string;
  relatedTodos: Todo[];
  deleteThisColumn: () => void;
  updateColumnName: (name: string) => void;
}

const HeaderSection: React.SFC<Props> = ({
  name,
  relatedTodos,
  deleteThisColumn,
  updateColumnName
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState(name);
  const inputEl = useRef<HTMLInputElement>(null);

  // as ComponentDidUpdate
  useEffect(function() {
    if (inputEl && inputEl.current) inputEl.current.focus();
  });

  // as ComponentDidMount
  useEffect(function() {
    if (name === "") setIsTyping(true);
  }, []);

  const onClickNameText = useCallback(function() {
    setIsTyping(true);
  }, []);

  const onChangeNameInput = useCallback(function(
    ev: SyntheticEvent<HTMLInputElement>
  ) {
    ev.persist();
    const value = (ev.target as any).value;
    setInputValue(value);
  },
  []);

  const onBlurNameInput = useCallback(
    function() {
      if (relatedTodos.length === 0 && inputValue === "" && name === "") {
        deleteThisColumn();
      }
      setInputValue(name);
      setIsTyping(false);
    },
    [relatedTodos, inputValue, name]
  );

  const onKeyPressColumnNameInput = useCallback(
    function(ev: KeyboardEvent<HTMLInputElement>) {
      if (ev.key === "Enter") {
        updateColumnName(inputValue);
        setIsTyping(false);
      }
    },
    [inputValue]
  );

  return (
    <Container>
      {!isTyping ? (
        <NameText onClick={onClickNameText}>{name}</NameText>
      ) : (
        <NameInput
          value={inputValue}
          onChange={onChangeNameInput}
          onBlur={onBlurNameInput}
          onKeyPress={onKeyPressColumnNameInput}
          ref={inputEl}
        />
      )}
      <DeleteButton onClick={deleteThisColumn}>&times;</DeleteButton>
    </Container>
  );
};

export default React.memo(HeaderSection);
