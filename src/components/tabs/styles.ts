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
  justify-content: ${props => props.full && 'space-around'};
  flex-shrink: 0;
  height: ${props => props.vertical ? 'auto' : `${dimensions.headerSpacing}px`};
`;

const TabCaption = styled.span`
  cursor: pointer;
  display: inline-block;
  padding: 15px ${dimensions.coreSpacing}px;
  position: relative;

  i {
    margin-right: 3px;
  }
`;

const Slider = styledTS<{ sizes?: string, position?: number, vertical?: boolean, backgroundFull?: boolean }>(styled.div)`
  ${props => props.vertical ? `
    height: ${props.sizes};
    right: -1px;
    top: 0px;
    transform: translateY(${props.position && 100 * props.position}%);
    ${props.backgroundFull && 'width: 100%'};
  ` : `
    width: ${props.sizes};
    left: 0;
    bottom: -1px;
    transform: translateX(${props.position && 100 * props.position}%);
    ${props.backgroundFull && 'height: 100%'};
  `}
  transition: 0.25s ease;
  position: absolute;
  content: '';
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Listener = styledTS<{ textColor?: string, ref?: any }>(styled.div)`
  width: fit-content;
  color: ${props => props.textColor ? props.textColor : colors.textSecondary};
  font-weight: ${typography.fontWeightRegular};
  &:hover {
    font-weight: 500;
    color: ${props => props.textColor ? props.textColor : colors.textPrimary};
  }
`

const Line = styledTS<{ sizes?: any, vertical?: boolean, backgroundFull?: boolean, color?: string }>(styled.div)`
  ${props => props.vertical ? `
    height: ${props.sizes ? `${props.sizes}px` : `100%`};
    ${props.backgroundFull ? `
      background: ${props.color ? props.color : colors.colorSecondary};
      width: 100%;
    ` : `
      border-right: 3px solid ${props.color ? props.color : colors.colorSecondary};
    `}
  ` : `
    width: ${props.sizes ? `${props.sizes}px` : `100%`};
    ${props.backgroundFull ? `
      background: ${props.color ? props.color : colors.colorSecondary};
      height: 100%;
    ` : `
    border-bottom: 3px solid ${props.color ? props.color : colors.colorSecondary};
    `}
  `}
`

export { TabContainer, TabCaption, Slider, Listener, Line };
