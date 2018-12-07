import styled from "styled-components";
import colors from "../../lib/colors";

export default styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  color: ${colors.middle};
  &:hover {
    font-weight: bold;
  }
`;
