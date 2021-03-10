import React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import { colors } from '../styles';

const InfoText = styledTS<{ color?: string }>(styled.span)`
  font-weight: 500;
  color: ${props => props.color ? props.color : 'inherit'}
`;

type Props = {
  children: React.ReactNode;
  color?: string;
};

class Info extends React.PureComponent<Props> {
  static defaultProps = {
    color: colors.textPrimary
  };

  render() {
    const { children, color } = this.props;

    return (
      <InfoText color={color}>
        {children}
      </InfoText>
    );
  }
}

export default Info;
