import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import { colors, dimensions, typography } from '../../styles';

const TabContainer = styledTS<{ grayBorder?: boolean; full?: boolean, vertical?: boolean }>(
  styled.div
)`
  border-bottom: 1px solid
    ${props => (props.grayBorder ? colors.borderDarker : colors.borderPrimary)};
  margin-bottom: -1px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: ${props => props.vertical && 'column'};
  justify-content: ${props => props.full && 'space-evenly'};
  flex-shrink: 0;
  height: ${props => props.vertical ? 'auto' : `${dimensions.headerSpacing}px`};
`;

const TabCaption = styledTS<{ type?: 'underlined' | 'underlined-vertical', backgroundColor?: string, textColor?: string }>(styled.span)`
  cursor: pointer;
  display: inline-block;
  color: ${colors.textSecondary};
  font-weight: ${typography.fontWeightRegular};
  padding: 15px ${dimensions.coreSpacing}px;
  position: relative;
  transition: all ease 0.3s;
  background-color: ${props => props.backgroundColor}

  &:hover {
    color: ${colors.textPrimary};
  }

  i {
    margin-right: 3px;
  }

  &.active {
    color: ${props => props.textColor ? props.textColor : colors.textPrimary};
    font-weight: 500;

    &:before {
      ${props => (props.type === 'underlined' || props.type === undefined) && `
      border-bottom: 3px solid ${colors.colorSecondary};
      content: '';
      width: 100%;
      position: absolute;
      z-index: 1;
      left: 0;
      bottom: -1px;
      `}
      ${props => props.type === 'underlined-vertical' && `
      border-right: 3px solid ${colors.colorSecondary};
      content: '';
      height: 100%;
      position: absolute;
      z-index: 1;
      right: -1px;
      top: 0px;
      `}
    }
  }
`;

export { TabContainer, TabCaption };
