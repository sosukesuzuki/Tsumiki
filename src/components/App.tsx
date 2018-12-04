import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Board from "./templates/Board";
import { ActionTypes } from "../lib/actionCreators";

const Container = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-rows: 1fr;
  overflow-y: hidden;
`;

interface AppProps {
  fetchBoardData: () => { type: ActionTypes };
}

const App: React.SFC<AppProps> = ({ fetchBoardData }) => {
  useEffect(() => {
    fetchBoardData();
  }, []);

  return (
    <Container>
      <Board />
    </Container>
  );
};

export default connect(
  null,
  dispach => ({
    fetchBoardData: () =>
      dispach({
        type: ActionTypes.FetchBoardData
      })
  })
)(App);
