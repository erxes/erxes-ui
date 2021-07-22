import Icon from '../../components/Icon';
import { colors, dimensions, typography } from '../../styles';
import { darken } from '../../styles/ecolor';
import { slideDown } from '../../utils/animations';
import React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';

  
const types = {
  info: {
    background: colors.colorCoreBlue,
    icon: 'info-circle'
  },

  warning: {
    background: darken(colors.colorCoreYellow, 10),
    icon: 'exclamation-triangle'
  },

  error: {
    background: colors.colorCoreRed,
    icon: 'times-circle'
  },

  success: {
    background: colors.colorCoreGreen,
    icon: 'check-circle'
  }
};

export const AlertItem = styledTS<{ type: string }>(styled.div)`
  display: flex;
  position:relative;
  align-items:center;
  margin: 10px auto;
  transition: all 0.5s;
  color: ${colors.colorCoreBlack};
  padding: 10px 30px 10px 10px;
  z-index: 10;
  font-weight: ${typography.fontWeightRegular};
  background-color: ${colors.colorWhite};
  animation-name: ${slideDown};
  border-radius: 4px;
  border-left: 10px solid ${props => types[props.type].background};
  animation-duration: 0.3s;
  animation-timing-function: ease;
  box-shadow: -1px 0 5px rgba(0, 0, 0, 0.3);

  span {
    margin-left: ${dimensions.unitSpacing}px;
  }

  i {
    margin-right: 5px;
    font-size: 25px;
    color: ${props => types[props.type].background};
  }
  button {
    position: absolute;
    top: 1px;
    right: 1px;
    background:none;
    color: ${colors.colorCoreBlack};
    border: none;
    text-decoration: none;
    
  }
`;

type Props = {
  type: string;
  time?: number;
  children: React.ReactNode; 
};

type State = {
  visible: boolean;
  time:number;
};

export default class AlertStyled extends React.Component<Props, State> {
  static defaultProps = {
    type: 'information'
  };

  private timeout: NodeJS.Timer ;

  constructor(props: Props) {
    super(props);
    this.state = { visible: true , time: this.props.time ||  3500};
    this.timeout = setTimeout(() => {
      this.setState({visible:false})
    }, this.state.time);
  }
  handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({visible:false})
  };

  holdTimeOut= (e: React.MouseEvent<HTMLButtonElement>) =>{
    clearTimeout(this.timeout)
  }
  
  setTimeOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTimeout(() => {
      this.setState({visible:false})
    }, 2000);
  };


  render() { 
    if( !this.state.visible){
      return;
    }

    return (
      <AlertItem {...this.props} onMouseOver={this.holdTimeOut} onMouseLeave={this.setTimeOut}>
        <Icon icon={types[this.props.type].icon} />
        {this.props.children}
        <button
        type="button"
        onClick={this.handleClose}
        onMouseLeave={this.setTimeOut}
        > x </button>
      </AlertItem>
    );
  }
}
