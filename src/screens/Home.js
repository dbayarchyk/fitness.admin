import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import HomeView from '../components/Home';
import Manage from './Manage';

const Home = () => (
  <HomeView>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/dashboard" />}/>
      <Route exact path="/manage/:category" component={Manage} />
    </Switch>
  </HomeView>
);

export default Home;
