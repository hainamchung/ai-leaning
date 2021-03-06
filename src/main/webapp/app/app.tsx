import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';

import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import AppRoutes from 'app/route';
import { userConfirmation } from 'app/shared/component';

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

export interface IAppProps extends StateProps, DispatchProps {
  getCurrentUserInfoAction: () => void;
  getAllAppDataAction: () => void;
}

export class App extends React.Component<IAppProps> {
  render() {
    return (
      <React.Fragment>
        <Router basename={baseHref} getUserConfirmation={(mes, callback) => userConfirmation(mes, callback)}>
          <AppRoutes />
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(hot(module)(App));
