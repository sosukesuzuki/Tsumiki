import React, { useState, useCallback, ChangeEvent } from "react";
import styled from "styled-components";
import Textarea from "../../atoms/Textarea";
import BoxButton from "../../atoms/BoxButton";
import { Todo } from "../../../lib/type";
import { connect } from "react-redux";
import { ActionTypes } from "../../../lib/actionCreators";
import colors from "../../../lib/colors";

const Container = styled.section``;
const SectionTitle = styled.h3``;
const DescriptionContainer = styled.div`
  cursor: pointer;
`;
const DescriptionText = styled.p``;
const DescriptionNothingText = styled.p`
  color: ${colors.middle};
`;
const DescriptionTextarea = styled(Textarea)`
  width: 100%;
`;
const SaveButton = styled(BoxButton)``;

type Props = Todo & {
  updateTodo: (todo: Todo) => { type: ActionTypes };
};

const TodoDescriptionSection: React.SFC<Props> = ({ updateTodo, ...todo }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [textareaValue, setTextareaValue] = useState(todo.detail);

  const onClickDescriptionContainer = useCallback(function() {
    setIsTyping(true);
  }, []);

  const onChangeTextarea = useCallback(function(
    ev: ChangeEvent<HTMLTextAreaElement>
  ) {
    ev.persist();
    const value = (ev.target as any).value;
    setTextareaValue(value);
  },
  []);

  const onSaveDescription = useCallback(
    function() {
      textareaValue &&
        updateTodo({
          ...todo,
          detail: textareaValue
        });
      setIsTyping(false);
    },
    [textareaValue]
  );

  return (
    <Container>
      <SectionTitle>詳細説明</SectionTitle>
      {!isTyping ? (
        <DescriptionContainer onClick={onClickDescriptionContainer}>
          {todo.detail ? (
            <DescriptionText>{todo.detail}</DescriptionText>
          ) : (
            <DescriptionNothingText>
              詳しい説明を追加してください。
            </DescriptionNothingText>
          )}
        </DescriptionContainer>
      ) : (
        <>
          <DescriptionTextarea
            value={textareaValue}
            onChange={onChangeTextarea}
            placeholder="詳しい説明を追加してください..."
            onBlur={onSaveDescription}
            autoFocus
          />
          <SaveButton onClick={onSaveDescription}>保存</SaveButton>
        </>
      )}
    </Container>
  );
};

export default React.memo(
  connect(
    null,
    dispatch => ({
      updateTodo: (todo: Todo) =>
        dispatch({ type: ActionTypes.UpdateTodo, payload: { todo } })
    })
  )(TodoDescriptionSection)
);
