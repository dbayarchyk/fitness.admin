import React from 'react';
import { Route, Switch } from 'react-router-dom';

import restrictedRoute from './hoc/restrictedRoute';

import Login from './screens/Login';
import Home from './screens/Home';

const Routes = () => (
  <Switch>
    <Route exact path="/signin" component={Login} />
    <Route path="/" component={Home} />
  </Switch>
);

export default Routes;
