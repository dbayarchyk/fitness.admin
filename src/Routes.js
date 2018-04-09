import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './screens/Login';
// import SignUp from './screens/SignUp';
// import Home from './screens/Home';

const Routes = () => (
  <Switch>
    <Route exact path="/signin" component={Login} />
    {/* <Route exact path="/signup" component={SignUp} />
    <Route path="/" component={Home} /> */}
  </Switch>
);

export default Routes;
