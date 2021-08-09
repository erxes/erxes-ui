import Icon from "../../components/Icon";
import { colors, dimensions, typography } from "../../styles";
import { darken } from "../../styles/ecolor";
import { slideDown } from "../../utils/animations";
import React from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";

const types = {
  info: {
    background: colors.colorCoreBlue,
    icon: "info-circle",
  },

  warning: {
    background: darken(colors.colorCoreYellow, 10),
    icon: "exclamation-triangle",
  },

  error: {
    background: colors.colorCoreRed,
    icon: "times-circle",
  },

  success: {
    background: colors.colorCoreGreen,
    icon: "check-circle",
  },
};

export const AlertItem = styledTS<{ type: string }>(styled.div)`
  position:relative;
  display: flex;
  justify-content: space-between;
  align-items:center;
  transition: all 0.5s;
  color: ${colors.textPrimary};
  margin: ${dimensions.unitSpacing}px auto;
  padding: ${dimensions.unitSpacing}px;
  z-index: ${dimensions.unitSpacing};
  font-weight: ${typography.fontWeightRegular};
  background-color: ${colors.colorWhite};
  animation-name: ${slideDown};
  border-radius: 4px;
  border-left: ${dimensions.unitSpacing - 4}px solid ${(props) =>
  types[props.type].background};
  animation-duration: 0.3s;
  animation-timing-function: ease;
  box-shadow: -1px 0 5px rgba(0, 0, 0, 0.3);
  
  > div {
    display: flex;
    align-items: center;
    margin-right: ${dimensions.unitSpacing}px;
  }

  span {
    margin-left: ${dimensions.unitSpacing}px;
  }

  i {
    margin-right: 5px;
    font-size: 25px;
    color: ${(props) => types[props.type].background};
  }

  button {
    background:none;
    border: none;
    cursor: pointer;
    padding: 0;

    > i {
      font-size: ${dimensions.unitSpacing + 2}px;
      color: ${colors.colorCoreGray};
    }
  }
`;

type Props = {
  type: string;
  time?: number;
  children: React.ReactNode;
};

type State = {
  visible: boolean;
  time: number;
};

export default class AlertStyled extends React.Component<Props, State> {
  static defaultProps = {
    type: "information",
  };

  private timeout: NodeJS.Timer;

  constructor(props: Props) {
    super(props);

    this.state = { visible: true, time: this.props.time || 3500 };

    this.timeout = setTimeout(() => {
      this.setState({ visible: false });
    }, this.state.time);
  }

  handleClose = () => {
    this.setState({ visible: false });
  };

  holdTimeOut = () => {
    clearTimeout(this.timeout);
  };

  setTimeOut = () => {
    setTimeout(() => {
      this.setState({ visible: false });
    }, 2000);
  };

  render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <AlertItem
        {...this.props}
        onMouseOver={this.holdTimeOut}
        onMouseLeave={this.setTimeOut}
      >
        <div>
          <Icon icon={types[this.props.type].icon} />
          {this.props.children}
        </div>
        <button
          type="button"
          onClick={this.handleClose}
          onMouseLeave={this.setTimeOut}
        >
          <Icon icon="times" />
        </button>
      </AlertItem>
    );
  }
}
