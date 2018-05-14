import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import Avatar from 'material-ui/Avatar';

import CATEGORY from './category';
import * as PURPOSE from '../purpose';

const dateFilter = date => moment(date).format('Do MMM YYYY');

const COLUMNS = {
  [CATEGORY.MUSCLES.type]: {
    NAME: {
      name: 'name',
      title: 'Name',
    },
    GROUP: {
      name: 'group',
      title: 'Group'
    },
    CREATED_DATE: {
      name: 'createdAt',
      title: 'Created Date',
      filter: dateFilter,
      defaultDirection: 'desc',
    },
    UPDATED_DATE: {
      name: 'updatedAt',
      title: 'Updated Date',
      filter: dateFilter,
      defaultDirection: 'desc',
    },
  },
  [CATEGORY.EXERCISES.type]: {
    AVATAR: {
      name: 'avatarUrl',
      title: 'Avatar',
      filter: avatarUrl => <Avatar src={avatarUrl} />,
      sortDisabled: true,
    },
    NAME: {
      name: 'name',
      title: 'Name',
    },
    MUSCLES: {
      name: 'muscles.edges',
      title: 'Muscles',
      filter: edges => edges.map(({ node }) => node.name).join(', '),
      sortDisabled: true,
    },
    CREATED_DATE: {
      name: 'createdAt',
      title: 'Created Date',
      filter: dateFilter,
      defaultDirection: 'desc',
    },
    UPDATED_DATE: {
      name: 'updatedAt',
      title: 'Updated Date',
      filter: dateFilter,
      defaultDirection: 'desc',
    },
  },
  [CATEGORY.USERS.type]: {
    NAME: {
      name: 'name',
      title: 'Name',
    },
    SURNAME: {
      name: 'surname',
      title: 'Surname',
    },
    EMAIL: {
      name: 'email',
      title: 'Email',
    },
    AGE: {
      name: 'age',
      title: 'Age',
    },
    PURPOSE: {
      name: 'purpose',
      title: 'Purpose',
      filter: value => _.find(_.values(PURPOSE), { value }).title,
    },
    ROLE: {
      name: 'role',
      title: 'Role',
      filter: _.capitalize,
    },
    CREATED_DATE: {
      name: 'createdAt',
      title: 'Created Date',
      filter: dateFilter,
      defaultDirection: 'desc',
    },
    UPDATED_DATE: {
      name: 'updatedAt',
      title: 'Updated Date',
      filter: dateFilter,
      defaultDirection: 'desc',
    },
  },
  [CATEGORY.FOODS.type]: {
    AVATAR: {
      name: 'avatarUrl',
      title: 'Avatar',
      filter: avatarUrl => <Avatar src={avatarUrl} />,
      sortDisabled: true,
    },
    NAME: {
      name: 'name',
      title: 'Name',
    },
    CATEGORY: {
      name: 'category',
      title: 'Category',
    },
    CALORIFIC_VALUE: {
      name: 'calorificValue',
      title: 'Calorific Value',
      filter: value => `${value}kKal`,
    },
    PROTEINS: {
      name: 'proteins',
      title: 'Proteins',
      filter: value => `${value}g`,
    },
    CARBOHYDRATES: {
      name: 'carbohydrates',
      title: 'Carbohydrates',
      filter: value => `${value}g`,
    },
    FATS: {
      name: 'fats',
      title: 'Fats',
      filter: value => `${value}g`,
    },
    CREATED_DATE: {
      name: 'createdAt',
      title: 'Created Date',
      filter: dateFilter,
      defaultDirection: 'desc',
    },
    UPDATED_DATE: {
      name: 'updatedAt',
      title: 'Updated Date',
      filter: dateFilter,
      defaultDirection: 'desc',
    },
  },
  [CATEGORY.MEAL_PLANS.type]: {
    AVATAR: {
      name: 'avatarUrl',
      title: 'Avatar',
      filter: avatarUrl => <Avatar src={avatarUrl} />,
      sortDisabled: true,
    },
    NAME: {
      name: 'name',
      title: 'Name',
    },
    CREATED_DATE: {
      name: 'createdAt',
      title: 'Created Date',
      filter: dateFilter,
      defaultDirection: 'desc',
    },
    UPDATED_DATE: {
      name: 'updatedAt',
      title: 'Updated Date',
      filter: dateFilter,
      defaultDirection: 'desc',
    },
  },
  [CATEGORY.MEAL_PLAN_TEMPLATES.type]: {
    AVATAR: {
      name: 'avatarUrl',
      title: 'Avatar',
      filter: avatarUrl => <Avatar src={avatarUrl} />,
      sortDisabled: true,
    },
    NAME: {
      name: 'name',
      title: 'Name',
    },
    CREATED_DATE: {
      name: 'createdAt',
      title: 'Created Date',
      filter: dateFilter,
      defaultDirection: 'desc',
    },
    UPDATED_DATE: {
      name: 'updatedAt',
      title: 'Updated Date',
      filter: dateFilter,
      defaultDirection: 'desc',
    },
  },
  [CATEGORY.WORKOUT_PLANS.type]: {
    AVATAR: {
      name: 'avatarUrl',
      title: 'Avatar',
      filter: avatarUrl => <Avatar src={avatarUrl} />,
      sortDisabled: true,
    },
    NAME: {
      name: 'name',
      title: 'Name',
    },
    CREATED_DATE: {
      name: 'createdAt',
      title: 'Created Date',
      filter: dateFilter,
      defaultDirection: 'desc',
    },
    UPDATED_DATE: {
      name: 'updatedAt',
      title: 'Updated Date',
      filter: dateFilter,
      defaultDirection: 'desc',
    },
  },
  [CATEGORY.WORKOUT_PLAN_TEMPLATES.type]: {
    AVATAR: {
      name: 'avatarUrl',
      title: 'Avatar',
      filter: avatarUrl => <Avatar src={avatarUrl} />,
      sortDisabled: true,
    },
    NAME: {
      name: 'name',
      title: 'Name',
    },
    CREATED_DATE: {
      name: 'createdAt',
      title: 'Created Date',
      filter: dateFilter,
      defaultDirection: 'desc',
    },
    UPDATED_DATE: {
      name: 'updatedAt',
      title: 'Updated Date',
      filter: dateFilter,
      defaultDirection: 'desc',
    },
  },
};

export default COLUMNS;
