import _ from 'lodash';

import CATEGORY from '../constants/manage/category';
import COLUMNS from '../constants/manage/columns';
import QUERIES from '../constants/manage/queries';
import FRAGMENTS from '../constants/manage/fragments';
import REFETCH_QUERIES from '../constants/manage/refetch-queries';
import TOOLBAR_ACTIONS from '../constants/manage/toolbarActions';

class ManageService {
  getQuery(category) {
    return QUERIES[category];
  }

  getFragment(category) {
    return FRAGMENTS[category];
  }

  gerRefetchQuery(category) {
    return REFETCH_QUERIES[category];
  }

  getColumns(category) {
    return _.values(COLUMNS[category]);
  }

  getToolbarTitle(category) {
    const categoryObject = _.find(_.values(CATEGORY), { type: category });

    return `Manage ${categoryObject.title}`;
  }

  getToolbarActions(category) {
    return TOOLBAR_ACTIONS[category];
  }

  getItems(type, viewer) {
    const items = viewer[type];

    if (!items) {
      throw new Error('Type is invalid');
    }

    return items;
  }

  getSortValue(sort) {
    if (!sort || !sort.name) {
      return null;
    }

    const { name, direction } = sort;

    return direction === 'asc' ? name : `-${name}`;
  }

  saveSortToLavalStorage(category, sort) {
    localStorage.setItem(`manage-${category}-sort`, JSON.stringify(sort));
  }

  getSortFromLocalStorage(category) {
    return JSON.parse(localStorage.getItem(`manage-${category}-sort`));
  }
}

export default new ManageService();
