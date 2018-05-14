import React from 'react';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ClassIcon from 'material-ui/svg-icons/action/class';
import TextFormatIcon from 'material-ui/svg-icons/content/text-format';
import ContentCopyIcon from 'material-ui/svg-icons/content/content-copy';

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

export const RENAME = {
  title: 'Rename',
  action: 'rename',
  icon: <TextFormatIcon />,
};

export const DUPLICATE = {
  title: 'Duplicate',
  action: 'duplicate',
  icon: <ContentCopyIcon />,
};

export const SAVE_AS_TEMPLATE = {
  title: 'Save as Template',
  action: 'saveAsTemplate',
  icon: <ClassIcon />,
};

const DEFAULT_TOOLBAR_ACTIONS = {
  left: [
    EDIT,
    DELETE,
  ],
  contextMenu: [
    RENAME,
    DUPLICATE,
  ],
};

export default {
  [CATEGORY.MUSCLES.type]: DEFAULT_TOOLBAR_ACTIONS,
  [CATEGORY.EXERCISES.type]: DEFAULT_TOOLBAR_ACTIONS,
  [CATEGORY.FOODS.type]: DEFAULT_TOOLBAR_ACTIONS,
  [CATEGORY.MEAL_PLANS.type]: {
    ...DEFAULT_TOOLBAR_ACTIONS,
    contextMenu: [
      ...DEFAULT_TOOLBAR_ACTIONS.contextMenu,
      SAVE_AS_TEMPLATE,
    ],
  },
  [CATEGORY.MEAL_PLAN_TEMPLATES.type]: {
    left: [
      RENAME,
      DELETE,
    ],
    contextMenu: [
      DUPLICATE,
    ],
  },
  [CATEGORY.WORKOUT_PLANS.type]: {
    ...DEFAULT_TOOLBAR_ACTIONS,
    contextMenu: [
      ...DEFAULT_TOOLBAR_ACTIONS.contextMenu,
      SAVE_AS_TEMPLATE,
    ],
  },
  [CATEGORY.WORKOUT_PLAN_TEMPLATES.type]: {
    left: [
      RENAME,
      DELETE,
    ],
    contextMenu: [
      DUPLICATE,
    ], 
  },
};
