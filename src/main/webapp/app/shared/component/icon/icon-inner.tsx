import React, { PureComponent } from 'react';
import icons from '../../../../static/icons.json';

interface IIconInnerProps {
  icon: any;
}
class IconInner extends PureComponent<IIconInnerProps> {
  createMarkup(markup) {
    // we dont sanitize markup
    // since icons.json is maintained within the package before build
    // do the weird thing for dangerouslySetInnerHTML
    return { __html: markup };
  }

  render() {
    const { icon } = this.props;
    const iconMarkup = icons[icon];

    if (iconMarkup) {
      return <g dangerouslySetInnerHTML={this.createMarkup(iconMarkup)} />;
    }
    return null;
  }
}

export default IconInner;
