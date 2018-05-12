import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';

import ExtensionIcon from 'material-ui/svg-icons/action/extension';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import FiberNewIcon from 'material-ui/svg-icons/av/fiber-new';

import MANAGE_CATEGORY from '../../../constants/manage/category';

const NavBar = ({ onNavItemClicked }) => {
  const NavItem = ({ to, ...listItemProps }) => (
    <ListItem
      {...listItemProps}
      onClick={() => onNavItemClicked(to)}
      containerElement={to && <Link to={to} />}
      rightIcon={<FiberNewIcon />}
    />
  );

  return (
    <List>
      <ListItem
        primaryText="Create"
        leftIcon={<ExtensionIcon />}
        primaryTogglesNestedList
        nestedItems={[
          <NavItem primaryText="Muscle" to="/muscle-builder" />,
          <NavItem primaryText="Exercise" to="/exercise-builder" />,
          <NavItem primaryText="Food" to="/food-builder" />,
          <NavItem primaryText="Meal Plan" to="/meal-plan-builder" />,
          <NavItem primaryText="Workout Plan" to="/workout-plan-builder" />,
        ]}
      />
      <ListItem
        primaryText="Manage"
        leftIcon={<SettingsIcon />}
        primaryTogglesNestedList
        nestedItems={[
          <NavItem primaryText="Muscles" to={`/manage/${MANAGE_CATEGORY.MUSCLES.type}`} />,
          <NavItem primaryText="Exercises" to={`/manage/${MANAGE_CATEGORY.EXERCISES.type}`} />,
          <NavItem primaryText="Foods" to={`/manage/${MANAGE_CATEGORY.FOODS.type}`} />,
          <NavItem primaryText="Meal Plans" to={`/manage/${MANAGE_CATEGORY.MEAL_PLANS.type}`} />,
          <NavItem primaryText="Workout Plans" to={`/manage/${MANAGE_CATEGORY.WORKOUT_PLANS.type}`} />,
        ]}
      />
    </List>
  );
};

NavBar.propTypes = {
  onNavItemClicked: PropTypes.func,
};

NavBar.defaultProps = {
  onNavItemClicked: null,
};

export default NavBar;
