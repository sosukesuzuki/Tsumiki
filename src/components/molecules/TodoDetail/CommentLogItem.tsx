import React, {
  useCallback,
  useState,
  SyntheticEvent,
  useEffect,
  useRef,
  KeyboardEvent
} from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { TodoComment, UpdateDiffComment } from "../../../lib/types";
import colors from "../../../lib/colors";
import { ActionTypes } from "../../../lib/actionCreators";
import IconButton from "../../atoms/IconButton";
import Input from "../../atoms/Input";

const Container = styled.div`
  border: 1px solid ${colors.middle};
  display: flex;
`;
const UpdateInput = styled(Input)``;
const CommentDeleteButton = styled(IconButton)``;
const EidtCommentButton = styled(IconButton)``;

type CommentComponentProps = TodoComment & {
  deleteComment: (commentId: string) => { type: ActionTypes };
  updateComment: (id: string, diff: UpdateDiffComment) => { type: ActionTypes };
};

const CommentComponentProps: React.SFC<CommentComponentProps> = ({
  deleteComment,
  updateComment,
  ...comment
}) => {
  const [isEditting, setIsEditting] = useState(false);
  const [inputValue, setInputValue] = useState(comment.content);

  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(function() {
    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  }, []);

  const onChangeInput = useCallback(function(
    ev: SyntheticEvent<HTMLInputElement>
  ) {
    ev.persist();
    const value = (ev.target as any).value;
    setInputValue(value);
  },
  []);

  const onBlurInput = useCallback(function() {
    setIsEditting(false);
  }, []);

  const onKeyPressInput = useCallback(
    function(ev: KeyboardEvent<HTMLInputElement>) {
      if (ev.key === "Enter") {
        ev.preventDefault();
        updateComment(comment.id, {
          content: inputValue
        });
        setIsEditting(false);
      }
    },
    [inputValue]
  );

  const onClickDeleteCommentButton = useCallback(
    function() {
      deleteComment(comment.id);
    },
    [comment.id]
  );

  const onClickEditCommentButton = useCallback(function() {
    setIsEditting(true);
  }, []);

  return (
    <Container>
      {!isEditting ? (
        <p>{comment.content}</p>
      ) : (
        <UpdateInput
          value={inputValue}
          onChange={onChangeInput}
          onKeyPress={onKeyPressInput}
          onBlur={onBlurInput}
          ref={inputEl}
        />
      )}
      <CommentDeleteButton onClick={onClickDeleteCommentButton}>
        削除
      </CommentDeleteButton>
      <EidtCommentButton onClick={onClickEditCommentButton}>
        編集
      </EidtCommentButton>
    </Container>
  );
};

export default connect(
  null,
  dispatch => ({
    deleteComment: (commentId: string) =>
      dispatch({ type: ActionTypes.DeleteComment, payload: { commentId } }),
    updateComment: (id: string, diff: UpdateDiffComment) =>
      dispatch({ type: ActionTypes.UpdateComment, payload: { id, diff } })
  })
)(CommentComponentProps);
