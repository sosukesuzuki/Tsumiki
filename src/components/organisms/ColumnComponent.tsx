import React from "react";
import styled from "styled-components";
import { Column } from "../../lib/type";
import colors from "../../lib/colors";

const Container = styled.div`
  width: 200px;
  background-color: ${colors.light};
  color: ${colors.heavy};
  margin: 0 15px;

  display: flex;
  overflow-x: auto;
  overflow-y: hidden;

  display: inline-block;
`;

type ColumnComponentProps = Column & {};

const ColumnComponent: React.SFC<ColumnComponentProps> = ({ name }) => {
  return (
    <Container>
      <h3>{name || "名前はありません。"}</h3>
    </Container>
  );
};

export default ColumnComponent;
