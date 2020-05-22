import React from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';

import history from 'app/config/history';
import HomeContainer from 'app/module/home';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={HomeContainer} />
    </Switch>
  </Router>
);

export default Routes;
