import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import colors from "../../lib/colors";
import { State } from "../../lib/reducer";
import ColumnComponent from "../organisms/Column";
import { ActionTypes } from "../../lib/actionCreators";
import { Column } from "../../lib/types";
import BoxButton from "../atoms/BoxButton";

const Container = styled.main`
  background-color: ${colors.middle};
  display: flex;
  padding: 10px;
  width: 100%;
  overflow-x: scroll;
`;
const AddListButton = styled(BoxButton)`
  height: 40px;
  width: 270px;
`;

interface Props {
  columns: Column[];
  addColumn: () => { type: ActionTypes };
}

const Board: React.SFC<Props> = ({ columns, addColumn }) => {
  return (
    <Container>
      {columns.map(column => (
        <ColumnComponent key={column.id} {...column} />
      ))}
      <AddListButton onClick={addColumn}>
        + もうひとつリストを追加
      </AddListButton>
    </Container>
  );
};

export default connect(
  (state: State) => ({
    columns: state.columns
  }),
  dispatch => ({
    addColumn: () => dispatch({ type: ActionTypes.AddColumn })
  })
)(Board);
