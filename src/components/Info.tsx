import React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import { colors, dimensions } from '../styles';
import { rgba } from '../styles/ecolor';
import Icon from './Icon';

const addition = 2;

const bg = (type) => {
  switch (type) {
    case 'warning':
      return rgba(colors.colorCoreYellow, 0.2);
    case 'danger':
      return rgba(colors.colorCoreRed, 0.2);
    case 'info':
      return rgba(colors.colorCoreBlue, 0.2);
    case 'success':
      return rgba(colors.colorCoreGreen, 0.2);
    default:
      return rgba(colors.colorPrimary, 0.2);
  }
};

const contentColor = (type) => {
  switch (type) {
    case 'warning':
      return colors.colorCoreYellow;
    case 'danger':
      return colors.colorCoreRed;
    case 'info':
      return colors.colorCoreBlue;
    case 'success':
      return colors.colorCoreGreen;
    default:
      return colors.colorPrimary;
  }
};

const IconType = (type) => {
  switch (type) {
    case 'warning':
      return 'exclamation-octagon';
    case 'danger':
      return 'times-circle';
    case 'info':
      return 'info-circle';
    case 'success':
      return 'check-circle';
    default:
      return 'envelope-alt';
  }
};

const InfoBox = styledTS<{ bordered?: boolean; color?: string; type?: string, icon }>(styled.div)`
  min-height: ${dimensions.coreSpacing * 2}px;
  padding: ${dimensions.unitSpacing}px
    ${dimensions.coreSpacing}px;
  margin-bottom: ${dimensions.coreSpacing}px;
  background-color: ${props => bg(props.type)};
            
  border: ${props => props.bordered ? `${addition / 2}px solid ${bg(props.type)}` : 'none'};
  
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

const IconCont = styledTS<{ type?: string }>(styled.div)`
  display: flex;
  justify-content: center;
  margin-right: ${dimensions.unitSpacing}px;
  color: ${props => contentColor(props.type)};
`;

const ContentCont = styledTS<{ type?: string }>(styled.div)`
  margin-left: ${dimensions.unitSpacing}px;
  color: ${props => contentColor(props.type)};
  font-size: 14px;
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
  type?: 'primary' | 'danger' | 'warning' | 'success' | 'info';
  title?: string;
  icon?: boolean;
};

class Info extends React.PureComponent<Props> {
  static defaultProps = {
    round: false,
    color: colors.colorPrimaryDark
  };

  render() {
    const { title, children, round, color, type = 'primary', bordered = true, icon } = this.props;

    if (round) {
      return <Round color={color}>{children}</Round>;
    }

    return (
      <InfoBox title={title} bordered={bordered} type={type} color={color} icon={icon}>
        {icon ?
          <IconCont type={type}>
            <Icon size={26} icon={IconType(type)}></Icon>
          </IconCont>
        : null}
        <ContentCont type={type}>
          {title ?
            <InfoTitle>
              {title}
            </InfoTitle>
            : null}
          {children}
        </ContentCont>
      </InfoBox>
    );
  }
}

export default Info;
