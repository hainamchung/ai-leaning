import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import i18next from 'app/shared/locales';
import { FontIcon } from 'app/shared/component';
import { getTabPath } from 'app/shared/utils';
import { IRouteItem } from 'app/shared/model';
import { sidebarJQuery } from 'app/shared/jquery';
import { lgSize } from 'app/shared/constant';

interface ISubSiderProps extends StateProps, DispatchProps {
  getTasksStatictisAction: () => void;
  getJobOfferStatisticsAction: () => void;
  width?: number;
  usingDynamicSize?: boolean;
  location?: any;
  changeShowSideBar?: any;
}

interface ISubsiderState {
  width: number;
}
class SubSider extends Component<ISubSiderProps, ISubsiderState> {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentDidMount() {
    sidebarJQuery();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  renderItems = (items: IRouteItem[]) => {
    const { width } = this.state;
    return items.map((item, index) => (
      <div id={index.toString()} key={index.toString()} className={`subsider-item ${item.disable ? 'disabled' : ''}`}>
        {item.splitContent && <div className="split-content" />}
        <NavLink to={item.path} className="nav-link d-flex align-items-center item-subsider">
          <span className="left-icon">
            <FontIcon iconName={item.icon} className={`icon-16 ${item.icon}_subsider`} />
          </span>
          {width > lgSize && (
            <React.Fragment>
              <span className="tx-nav">{i18next.t(item.label)}</span>
              {item.badge !== null && <span className="badge">{item.badge}</span>}
            </React.Fragment>
          )}
        </NavLink>
      </div>
    ));
  };

  renderSubsider = () => {
    const {} = this.props;
    // todo
    return null;
  };

  renderHeader = () => {
    const { width } = this.state;
    const tabPath = this.props.location ? getTabPath(this.props.location.pathname) : '';
    switch (tabPath) {
      default:
        return null;
    }
  };

  renderExtendsData = () => {
    const tabPath = this.props.location ? getTabPath(this.props.location.pathname) : '';
    switch (tabPath) {
      default:
        return null;
    }
  };

  render() {
    const { width } = this.state;
    const header = this.renderHeader();
    return (
      <div className="popolamama-sidebar">
        {header}
        <div className={`popolamama-sidebar-body ${header ? 't-65-f' : ''}`}>
          <div className={`${width > lgSize ? 'pd-b-10 pd-x-10' : ''}`}>
            <nav className="nav nav-sidebar tx-13">{this.renderSubsider()}</nav>
          </div>
          {/* {this.renderExtendsData()} // todo */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => {
  // todo
  const {} = storeState;
  return null;
};

const mapDispatchToProps = dispatch => ({});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const subSider = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubSider);

export { subSider as SubSider };
