import React from 'react';

type DropdownToggleProps = {
  children: React.ReactNode;
  onClick?: (e: React.FormEvent) => void;
};

class DropdownToggle extends React.Component<DropdownToggleProps> {
  handleClick = e => {
    e.preventDefault();
    e.stopPropagation();

    const { onClick } = this.props;

    if (onClick) {
      onClick(e);
    }
  };

  render() {
    return <div onClick={this.handleClick}>{this.props.children}</div>;
  }
}

export default DropdownToggle;
