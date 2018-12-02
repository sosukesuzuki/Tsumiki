import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import colors from "../../lib/colors";
import { State } from "../../lib/reducer";
import ColumnComponent from "../organisms/ColumnComponent";

const Container = styled.main`
  background-color: ${colors.middle};
  display: flex;
  padding: 10px;
  width: 100%;
  overflow-x: scroll;
`;

type BoardProps = State & {};

const Board: React.SFC<BoardProps> = ({ columns }) => {
  return (
    <Container>
      {columns.map(column => (
        <ColumnComponent key={column.id} {...column} />
      ))}
    </Container>
  );
};

export default connect((state: State) => state)(Board);
