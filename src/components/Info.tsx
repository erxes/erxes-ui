import React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import { colors, dimensions } from '../styles';
import { rgba } from '../styles/ecolor';

const addition = 2;

const InfoBox = styledTS<{ bordered?: boolean; color?: string }>(styled.div)`
  min-height: ${dimensions.coreSpacing * 2}px;
  padding: ${dimensions.unitSpacing + 5}px
    ${dimensions.coreSpacing + addition}px;
  margin-bottom: ${dimensions.coreSpacing}px;
  background-color: ${colors.bgActive};
  border-left: ${props =>
    props.bordered ? `${addition}px solid ${props.color}` : 'none'};
  
  line-height: ${dimensions.coreSpacing + addition}px;
  border-radius: ${props => !props.bordered && `${addition}px`};

  h4 {
    margin-top: ${dimensions.unitSpacing / 2}px;
    margin-bottom: ${dimensions.coreSpacing}px;
  }
`;

const Round = styledTS<{ color?: string }>(styled.div)`
  padding: 3px 10px;
  background: ${props => rgba(props.color, 0.2)};
  margin-right: 20px;
  
  font-size: 12px;
  border-radius: 12px;

  a {
    font-weight: bold;
    color: ${colors.colorCoreBlack};
  }

  i {
    margin-right: 5px;
  }
`;

type Props = {
  children: React.ReactNode;
  round?: boolean;
  color?: string;
  bordered?: boolean;
};

class Info extends React.PureComponent<Props> {
  static defaultProps = {
    round: false,
    color: colors.colorSecondary
  };

  render() {
    const { children, round, color, bordered = true } = this.props;

    if (round) {
      return <Round color={color}>{children}</Round>;
    }

    return (
      <InfoBox bordered={bordered} color={color}>
        {children}
      </InfoBox>
    );
  }
}

export default Info;
