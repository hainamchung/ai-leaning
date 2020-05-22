import React, { Component } from 'react';
import IconInner from './icon-inner';

interface IIconProps {
  className?: string;
  size?: string;
  icon: any;
  otherProps?: any;
  id?: string;
}
class Icon extends Component<IIconProps> {
  public static defaultProps = {
    size: 23,
    className: ''
  };
  render() {
    const { icon, size, className, ...otherProps } = this.props;

    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`feather feather-${icon} ${className}`}
        {...otherProps}
      >
        <IconInner icon={icon} />
      </svg>
    );
  }
}

export { Icon };
