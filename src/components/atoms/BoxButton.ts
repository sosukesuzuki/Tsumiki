import styled from "styled-components";
import colors from "../../lib/colors";

export default styled.button`
  border: 1px solid ${colors.middle};
  border-radius: 0.5px;
  padding: 10px;
  transition: 0.1s;
  cursor: pointer;
  &:hover {
    transition: 0.1s;
    background-color: #fafafa;
  }
`;
