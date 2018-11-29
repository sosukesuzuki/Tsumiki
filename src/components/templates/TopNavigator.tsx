import React from "react";
import styled from "styled-components";
import colors from "../../lib/colors";

const Container = styled.nav`
  background-color: ${colors.heavy};
  color: ${colors.light};
  h1 {
    margin: 0;
    line-height: 40px;
    font-size: 22px;
  }
`;

const TopNavigator = () => {
  return (
    <Container>
      <h1>Tsumiki</h1>
    </Container>
  );
};

export default TopNavigator;
