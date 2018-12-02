import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import colors from "../../lib/colors";

const Container = styled.main`
  background-color: ${colors.middle};
`;

const Board = () => {
  return <Container />;
};

export default connect(state => {
  return state;
})(Board);
