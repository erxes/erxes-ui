import React from 'react';
import Icon from './Icon';

type BoxProps = {
  title: string;
  name?: string;
  children: React.ReactNode;
  extraButtons?: React.ReactNode;
  callback?: () => void;
  collapsible?: boolean;
  isOpen?: boolean;
};

type BoxState = {
  isOpen?: boolean;
};

export default class Box extends React.Component<BoxProps, BoxState> {
  constructor(props: BoxProps) {
    super(props);
    const { name, isOpen = false } = props;
    const config = {};

    this.state = {
      isOpen: name ? config[name] || isOpen : false
    };
  }

  toggle = () => {
    const { name, callback } = this.props;
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen });

    if (name) {
      const config = {};

      config[name] = !isOpen;

      return callback && callback();
    }
  };

  renderDropBtn() {
    const { isOpen } = this.state;
    const icon = isOpen ? 'angle-down' : 'angle-right';
    const { extraButtons } = this.props;

    return (
      <>
        {isOpen && extraButtons && (
          <div>{extraButtons}</div>
        )}
        <div onClick={this.toggle}>
          <Icon icon={icon} size={16} />
        </div>
      </>
    );
  }

  render() {
    return (
      <div>
        box
      </div>
    );
  }
}
