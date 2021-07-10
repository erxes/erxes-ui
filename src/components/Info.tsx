import React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import { colors, dimensions } from '../styles';
import { rgba } from '../styles/ecolor';
import Icon from './Icon';

const addition = 2;

const colorTypes = ( type, value ) => {
  switch (type) {
    case 'warning':
      if (value === 'content')
        return colors.colorCoreSunYellow;
      if (value === 'background')
        return rgba(colors.colorCoreYellow, 0.2);
      if (value === 'icon')
        return 'exclamation-triangle';
    case 'danger':
      if (value === 'content')
        return colors.colorCoreRed;
      if (value === 'background')
        return rgba(colors.colorCoreRed, 0.2);
      if (value === 'icon')
        return 'times-circle';
    case 'info':
      if (value === 'content')
        return colors.colorCoreBlue;
      if (value === 'background')
        return rgba(colors.colorCoreBlue, 0.2);
      if (value === 'icon')
        return 'info-circle';
    case 'success':
      if (value === 'content')
      return colors.colorCoreGreen;
      if (value === 'background')
        return rgba(colors.colorCoreGreen, 0.2);
      if (value === 'icon')
        return 'check-circle';
    default:
      if (value === 'content')
      return colors.colorPrimary;
      if (value === 'background')
        return rgba(colors.colorPrimary, 0.2);
      if (value === 'icon')
        return 'envelope-alt';
  }
};

const InfoBox = styledTS<{ bordered?: boolean; color?: string; type?: string, iconShow }>(styled.div)`
  min-height: ${dimensions.coreSpacing * 2}px;
  padding: ${dimensions.unitSpacing}px
    ${dimensions.coreSpacing}px;
  margin-bottom: ${dimensions.coreSpacing}px;
  background-color: ${props => colorTypes(props.type, 'background')};
            
  border: ${props => props.bordered ? `${addition / 2}px solid ${colorTypes(props.type, 'background')}` : 'none'};
  
  border-radius: ${props => props.bordered && `${addition * 6}px`};
  display: flex;
  flex-direction: row;
  align-items: center;

  h4 {
    margin-top: ${dimensions.unitSpacing / 2}px;
    margin-bottom: ${dimensions.coreSpacing}px;
  }
`;

const InfoTitle = styledTS(styled.div)`
  font-size: 20px;
  margin-bottom: ${dimensions.unitSpacing / 2}px;
`;

const IconContainer = styledTS<{ type?: string }>(styled.div)`
  display: flex;
  justify-content: center;
  margin-right: ${dimensions.coreSpacing}px;
  color: ${props => colorTypes(props.type, 'content')};
`;

const ContentContainer = styledTS<{ type?: string }>(styled.div)`
  color: ${props => colorTypes(props.type, 'content')};
  font-size: 14px;
`;

type Props = {
  children: React.ReactNode;
  type?: 'primary' | 'danger' | 'warning' | 'success' | 'info';
  color?: string;
  title?: string;
  bordered?: boolean;
  iconShow?: boolean;
};

class Info extends React.PureComponent<Props> {
  static defaultProps = {
    color: colors.colorPrimaryDark
  };

  render() {
    const { title, children, color, type = 'primary', bordered = true, iconShow = false } = this.props;

    return (
      <InfoBox title={title} bordered={bordered} type={type} color={color} iconShow={iconShow}>
        {iconShow &&
          <IconContainer type={type}>
            <Icon size={26} icon={colorTypes(type, 'icon')}></Icon>
          </IconContainer>}
        <ContentContainer type={type}>
          {title &&
            <InfoTitle>
              {title}
            </InfoTitle>}
          {children}
        </ContentContainer>
      </InfoBox>
    );
  }
}

export default Info;
