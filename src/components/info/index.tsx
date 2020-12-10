import React from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import dimensions from "../../styles/dimensions";
import colors from "../../styles/colors";

const addition = 2;

const InfoBox = styledTS<{ bordered?: boolean }>(styled.div)`
  min-height: ${dimensions.coreSpacing * 2}px;
  padding: ${dimensions.unitSpacing + 5}px
    ${dimensions.coreSpacing + addition}px;
  margin-bottom: ${dimensions.coreSpacing}px;
  background-color: ${colors.bgActive};
  border-left: ${(props) =>
    props.bordered && `${addition}px solid ${colors.colorSecondary}`};
  line-height: ${dimensions.coreSpacing + addition}px;
  border-radius: ${(props) => !props.bordered && `${addition}px`};

  h4 {
    margin-top: ${dimensions.unitSpacing / 2}px;
    margin-bottom: ${dimensions.coreSpacing}px;
  }
`;

type InfoProps = {
  children: React.ReactNode;
  bordered?: boolean;
};

class Info extends React.PureComponent<InfoProps> {
  render() {
    const { children, bordered = true } = this.props;

    return <InfoBox bordered={bordered}>{children}</InfoBox>;
  }
}

export default Info;
