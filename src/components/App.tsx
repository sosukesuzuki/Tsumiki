import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TopNavigation from "./templates/TopNavigator";
import Board from "./templates/Board";
import { ActionTypes } from "../lib/actionCreators";

const Container = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-rows: 40px 1fr;
  overflow-y: hidden;
`;

interface AppProps {
  fetchBoardData: () => { type: ActionTypes };
}

const App: React.SFC<AppProps> = ({ fetchBoardData }) => {
  useEffect(() => {
    (async function() {
      await fetchBoardData();
    })();
  }, []);

  return (
    <Container>
      <TopNavigation />
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
