import React, { Component } from 'react';
import { FontIcon } from 'app/shared/component';

interface IButtonIconProps {
  iconName: string;
  containerClass?: string;
  iconClass?: string;
  contentClass?: string;
  isActive?: boolean;
  onClick?: (value) => any;
}

interface IButtonIconState {
  isActive: boolean;
}
class ButtonIcon extends Component<IButtonIconProps, IButtonIconState> {
  constructor(props) {
    super(props);
    this.state = {
      isActive: props.isActive
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isActive: nextProps.isActive });
  }

  handleClickButton = e => {
    const { onClick } = this.props;
    this.setState({ isActive: !this.state.isActive });
    onClick && onClick(e);
  };

  render() {
    const { containerClass, iconClass, contentClass, iconName } = this.props;
    const { isActive } = this.state;
    return (
      <button className={`${containerClass} ${isActive ? 'actived' : ''}`} type="button" onClick={this.handleClickButton}>
        <FontIcon className={iconClass} iconName={iconName} />
        <span className={contentClass}>{this.props.children}</span>
      </button>
    );
  }
}
export { ButtonIcon };
