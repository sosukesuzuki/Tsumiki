import React, { useCallback } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { TodoComment } from "../../lib/type";
import colors from "../../lib/colors";
import { ActionTypes } from "../../lib/actionCreators";

const Container = styled.div`
  border: 1px solid ${colors.heavy};
  display: flex;
`;

type CommentComponentProps = TodoComment & {
  deleteComment: (
    { commentId }: { commentId: string }
  ) => { type: ActionTypes };
};

const CommentComponentProps: React.SFC<CommentComponentProps> = ({
  deleteComment,
  ...comment
}) => {
  const onClickDeleteCommentButton = useCallback(function() {
    deleteComment({ commentId: comment.id });
  }, []);
  return (
    <Container>
      <p>{comment.content}</p>
      <button onClick={onClickDeleteCommentButton}>x</button>
    </Container>
  );
};

export default connect(
  null,
  dispatch => ({
    deleteComment: ({ commentId }: { commentId: string }) =>
      dispatch({ type: ActionTypes.DeleteComment, payload: { commentId } })
  })
)(CommentComponentProps);
