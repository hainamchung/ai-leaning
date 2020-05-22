import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { SiderContainer } from './sider-container';
import { Icon } from 'app/shared/component';
import { asideJquery, customJquery } from 'app/shared/jquery';
import { Routes } from 'app/shared/constant';

interface ISiderProps {
  location: object;
}
class Sider extends Component<ISiderProps> {
  componentDidMount() {
    asideJquery();
    customJquery();
  }

  render() {
    const { location } = this.props;
    return (
      <aside className="aside aside-fixed aside-popolamama minimize">
        <div className="aside-header">
          <Link to={Routes.Home} className="aside-logo">
            <img src={'popolamama'} className="logo" alt="Popolamama" height="40" />
          </Link>
          <div className="aside-menu-link">
            <Icon icon="menu" />
            <Icon icon="x" />
          </div>
          {/* <div id="atsMenu" className="burger-menu d-lg-none">
            <Icon icon="arrow-left" />
          </div> */}
        </div>
        <div className="aside-body">
          <SiderContainer location={location} />
        </div>
      </aside>
    );
  }
}
export { Sider };
