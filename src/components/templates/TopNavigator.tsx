import React from "react";
import styled from "styled-components";
import colors from "../../lib/colors";
import { connect } from "react-redux";
import { ActionTypes } from "../../lib/actionCreators";

const Container = styled.nav`
  background-color: ${colors.heavy};
  color: ${colors.light};
  display: flex;
  overflow-x: hidden;
  h1 {
    margin: 0;
    line-height: 40px;
    font-size: 22px;
  }
`;

interface TopNavigatorProps {
  addColumn: () => { type: ActionTypes };
}

const TopNavigator: React.SFC<TopNavigatorProps> = ({ addColumn }) => {
  return (
    <Container>
      <h1>Tsumiki</h1>
      <button onClick={addColumn}>+</button>
    </Container>
  );
};

export default connect(
  null,
  dispatch => ({
    addColumn: () => dispatch({ type: ActionTypes.AddColumn })
  })
)(TopNavigator);
