import React, { Component } from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';

import { getTabPath } from 'app/shared/utils/common';
import { FontIcon } from 'app/shared/component';
import i18next from 'app/shared/locales';
import { RouteItems } from 'app/shared/constant';

interface ISiderContainerProps {
  location: any;
}

class SiderContainer extends Component<ISiderContainerProps> {
  renderItems() {
    return RouteItems.map(item => (
      <Menu.Item className={`nav-item ${item.disable ? 'disabled' : ''}`} key={item.path} disabled={item.disable}>
        <NavLink className={`nav-link ${item.disable ? 'disabled' : ''}`} to={item.path}>
          <FontIcon iconName={item.icon} className={`icon-18 ${item.icon}-aside aside-icon mg-r-15`} />
          <span className="nav-text">{i18next.t(item.label)}</span>
        </NavLink>
      </Menu.Item>
    ));
  }

  render() {
    const { location } = this.props;
    return (
      <Menu className="nav nav-aside" defaultSelectedKeys={['/']} selectedKeys={[getTabPath(location.pathname)]}>
        {this.renderItems()}
      </Menu>
    );
  }
}

export { SiderContainer };
