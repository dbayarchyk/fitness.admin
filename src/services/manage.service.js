import _ from 'lodash';

import CATEGORY from '../constants/manage/category';
import COLUMNS from '../constants/manage/columns';
import QUERIES from '../constants/manage/queries';

class ManageService {
  getQuery(category) {
    return QUERIES[category];
  }

  getColumns(category) {
    return _.values(COLUMNS[category]);
  }

  getToolbarTitle(category) {
    const categoryObject = _.find(_.values(CATEGORY), { type: category });

    return `Manage ${categoryObject.title}`;
  }

  getItems(type, viewer) {
    const items = viewer[type];

    if (!items) {
      throw new Error('Type is invalid');
    }

    return items;
  }
}

export default new ManageService();
