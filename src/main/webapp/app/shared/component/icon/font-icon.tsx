import React from 'react';

interface IFontIconProps {
  iconName: string;
  className?: string;
  status?: string;
}
const FontIcon = (props: IFontIconProps) => (
  <i className={`aiicon-${props.iconName || ''} ${props.className || ''} ${props.status || ''}`} />
);

export { FontIcon };
