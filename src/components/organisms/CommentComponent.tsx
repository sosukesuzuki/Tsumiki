import React from "react";
import styled from "styled-components";
import { TodoComment } from "../../lib/type";
import colors from "../../lib/colors";

const Container = styled.div`
  border: 1px solid ${colors.heavy};
`;

type CommentComponentProps = TodoComment & {};

const CommentComponentProps: React.SFC<CommentComponentProps> = ({
  ...comment
}) => {
  return <Container>{comment.content}</Container>;
};

export default CommentComponentProps;
