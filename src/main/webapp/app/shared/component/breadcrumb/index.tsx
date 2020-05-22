import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import i18next from 'app/shared/locales';
import { IBreadCrumbItem } from 'app/shared/model';

interface IBreadcrumbProps extends StateProps {
  pathname?: string;
  routePath?: string;
  breakcrumbItems?: IBreadCrumbItem[];
}

class Breadcrumb extends Component<IBreadcrumbProps> {
  componentDidMount() {
    const { breakcrumbItems } = this.props;
  }

  renderItems(items: IBreadCrumbItem[]) {
    const { selectedCompany } = this.props;
    return items.map((item, index) => (
      <li key={`${index}_breadcrumb`} className={`breadcrumb-item ${index === items.length - 1 ? 'active' : ''}`}>
        <NavLink to={item.match.url}>{item.breadcrumb}</NavLink>
      </li>
    ));
  }

  render() {
    const { breakcrumbItems } = this.props;
    return (
      <nav aria-label="breadcrumb" className="nav-breadcrumb">
        <ol className="breadcrumb breadcrumb-style1">{this.renderItems(breakcrumbItems)}</ol>
      </nav>
    );
  }
}

const mapStateToProps = storeState => {
  const { companyReducer } = storeState;
  const { selectedCompany } = companyReducer;
  return {
    selectedCompany
  };
};

type StateProps = ReturnType<typeof mapStateToProps>;
const breadcrumb = connect(
  mapStateToProps,
  {}
)(Breadcrumb);

export { breadcrumb as Breadcrumb };
