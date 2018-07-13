import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import HomeView from '../components/Home';
import Dashboard from './Dashboard';
import Manage from './Manage';
import MuscleBuilder from './MuscleBuilder';
import ExerciseBuilder from './ExerciseBuilder';
import FoodBuilder from './FoodBuilder';
import MealPlanBuilderPreset from './MealPlanBuilderPreset';
import MealPlanBuilder from './MealPlanBuilder';
import WorkoutPlanBuilderPreset from './WorkoutPlanBuilderPreset';
import WorkoutPlanBuilder from './WorkoutPlanBuilder';

const Home = () => (
  <HomeView>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/dashboard" />} />

      <Route exact path="/dashboard" component={Dashboard} />

      <Route exact path="/manage/:category" component={Manage} />

      <Route exact path="/muscle-builder" component={MuscleBuilder} />
      <Route exact path="/muscle-builder/:id" component={MuscleBuilder} />

      <Route exact path="/exercise-builder" component={ExerciseBuilder} />
      <Route exact path="/exercise-builder/:id" component={ExerciseBuilder} />

      <Route exact path="/food-builder" component={FoodBuilder} />
      <Route exact path="/food-builder/:id" component={FoodBuilder} />

      <Route exact path="/meal-plan-builder" component={MealPlanBuilderPreset} />
      <Route exact path="/meal-plan-builder/creator" component={MealPlanBuilder} />
      <Route exact path="/meal-plan-builder/creator/:id" component={MealPlanBuilder} />

      <Route exact path="/workout-plan-builder" component={WorkoutPlanBuilderPreset} />
      <Route exact path="/workout-plan-builder/creator" component={WorkoutPlanBuilder} />
      <Route exact path="/workout-plan-builder/creator/:id" component={WorkoutPlanBuilder} />
    </Switch>
  </HomeView>
);

export default Home;
