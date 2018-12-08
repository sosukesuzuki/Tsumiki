import React, { useCallback } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { TodoComment } from "../../lib/type";
import colors from "../../lib/colors";
import { ActionTypes } from "../../lib/actionCreators";
import IconButton from "../atoms/IconButton";

const Container = styled.div`
  border: 1px solid ${colors.middle};
  display: flex;
`;
const CommentDeleteButton = styled(IconButton)``;

type CommentComponentProps = TodoComment & {
  deleteComment: (commentId: string) => { type: ActionTypes };
};

const CommentComponentProps: React.SFC<CommentComponentProps> = ({
  deleteComment,
  ...comment
}) => {
  const onClickDeleteCommentButton = useCallback(
    function() {
      deleteComment(comment.id);
    },
    [comment.id]
  );
  return (
    <Container>
      <p>{comment.content}</p>
      <CommentDeleteButton onClick={onClickDeleteCommentButton}>
        &times;
      </CommentDeleteButton>
    </Container>
  );
};

export default connect(
  null,
  dispatch => ({
    deleteComment: (commentId: string) =>
      dispatch({ type: ActionTypes.DeleteComment, payload: { commentId } })
  })
)(CommentComponentProps);
