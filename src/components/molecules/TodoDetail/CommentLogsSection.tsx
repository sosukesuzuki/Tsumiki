import React from "react";
import styled from "styled-components";
import { TodoComment } from "../../../lib/type";
import CommentComponent from "../../organisms/CommentComponent";

const Container = styled.section``;
const SectionTitle = styled.h3``;

interface Props {
  comments: TodoComment[];
}

const CommentLogsSection: React.SFC<Props> = ({ comments }) => {
  return (
    <Container>
      <SectionTitle>コメントログ</SectionTitle>
      {comments.map(comment => (
        <CommentComponent key={comment.id} {...comment} />
      ))}
    </Container>
  );
};

export default CommentLogsSection;
