import { createRefetchContainer } from 'react-relay';

import manageService from '../services/manage.service';

export default function (ComposedComponent, category) {
  if (!category) {
    throw new Error('Category is not defined');
  }

  return createRefetchContainer(
    ComposedComponent,
    manageService.getFragment(category),
    manageService.gerRefetchQuery(category)
  );
};