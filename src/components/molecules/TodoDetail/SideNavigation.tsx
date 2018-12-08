import React from "react";
import styled from "styled-components";
import BoxButton from "../../atoms/BoxButton";

const Container = styled.div``;
const DeleteTodoButton = styled(BoxButton)``;

interface Props {
  deleteTodo: () => void;
}

const SideNavigation: React.SFC<Props> = ({ deleteTodo }) => {
  return (
    <Container>
      <DeleteTodoButton onClick={deleteTodo}>
        このカードを削除する。
      </DeleteTodoButton>
    </Container>
  );
};

export default SideNavigation;
