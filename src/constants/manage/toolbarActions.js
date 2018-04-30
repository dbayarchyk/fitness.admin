import React from 'react';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import CATEGORY from './category';

export const EDIT = {
  title: 'Edit',
  action: 'edit',
  icon: <EditIcon />,
};

export const DELETE = {
  title: 'Delete',
  action: 'delete',
  icon: <DeleteIcon />,
};

const DEFAULT_TOOLBAR_ACTIONS = {
  left: [ EDIT, DELETE ],
};

export default {
  [CATEGORY.MUSCLES.type]: DEFAULT_TOOLBAR_ACTIONS,
  [CATEGORY.EXERCISES.type]: DEFAULT_TOOLBAR_ACTIONS,
  [CATEGORY.FOODS.type]: DEFAULT_TOOLBAR_ACTIONS,
  [CATEGORY.MEAL_PLANS.type]: DEFAULT_TOOLBAR_ACTIONS,
  [CATEGORY.WORKOUT_PLANS.type]: DEFAULT_TOOLBAR_ACTIONS,
};
