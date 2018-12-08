import styled from "styled-components";
import colors from "../../lib/colors";

export default styled.textarea`
  outline: none;
  border: none;
  border-radius: 0.5px;
  resize: none;
  box-shadow: 0 0 0 1px ${colors.middle};
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
`;
