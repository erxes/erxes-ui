import styled from "styled-components";
import colors from "../../styles/colors";
import { rotate } from "../../utils/animations";

const SmallLoader = styled.i`
  width: 13px;
  height: 13px;
  animation: ${rotate} 0.75s linear infinite;
  border: 1px solid ${colors.borderDarker};
  border-top-color: ${colors.colorSecondary};
  border-right-color: ${colors.colorSecondary};
  border-radius: 100%;
  float: left;
  position: relative;
  top: 2px;
  margin-right: 5px;
`;

export default SmallLoader
