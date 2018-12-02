import React from "react";
import styled from "styled-components";
import { Todo } from "../../lib/type";
import colors from "../../lib/colors";

const Container = styled.div`
  margin: 5px 0;
  background-color: ${colors.light};
  border: 1px solid ${colors.heavy};
`;

type TodoComponentProps = Todo & {};

const TodoComponent: React.SFC<TodoComponentProps> = ({ name }) => {
  return (
    <Container>
      <h4>{name || "名前はありません"}</h4>
    </Container>
  );
};

export default TodoComponent;
