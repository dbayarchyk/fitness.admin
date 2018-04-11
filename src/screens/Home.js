import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import HomeView from '../components/Home';
import Manage from './Manage';
import MuscleBuilder from './MuscleBuilder';

const Home = () => (
  <HomeView>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/dashboard" />}/>
      <Route exact path="/manage/:category" component={Manage} />

      <Route exact path="/muscle-builder" component={MuscleBuilder} />
      <Route exact path="/muscle-builder/:id" component={MuscleBuilder} />
    </Switch>
  </HomeView>
);

export default Home;
