import React from "react";
import styled from "styled-components";
import { Provider } from "react-redux";
import store from "../lib/store";
import TopNavigation from "./templates/TopNavigator";
import Board from "./templates/Board";

const Container = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-rows: 40px 1fr;
  overflow-y: hidden;
`;

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <TopNavigation />
        <Board />
      </Container>
    </Provider>
  );
};

export default App;
