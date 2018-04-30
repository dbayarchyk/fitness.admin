import React from 'react';
import { createRefetchContainer } from 'react-relay';

import manageService from '../services/manage.service';

export default function (ComposedComponent, category) {
  if (!category) {
    throw 'Category is defined';
  }
  const fragment = manageService.getFragment(category)
  // debugger

  return createRefetchContainer(
    ComposedComponent,
    manageService.getFragment(category),
    manageService.gerRefetchQuery(category)
  );
};