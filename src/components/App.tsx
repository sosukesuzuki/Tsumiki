import React from "react";
import styled from "styled-components";
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
    <Container>
      <TopNavigation />
      <Board />
    </Container>
  );
};

export default App;
