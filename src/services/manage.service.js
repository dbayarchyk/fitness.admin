import _ from 'lodash';

import CATEGORY from '../constants/manage/category';
import COLUMNS from '../constants/manage/columns';
import QUERIES from '../constants/manage/queries';
import FRAGMENTS from '../constants/manage/fragments';
import REFETCH_QUERIES from '../constants/manage/refetch-queries';
import TOOLBAR_ACTIONS from '../constants/manage/toolbarActions';

import UpdateExercise from '../mutations/UpdateExercise';
import UpdateMuscle from '../mutations/UpdateMuscle';
import UpdateFood from '../mutations/UpdateFood';
import UpdateMealPlan from '../mutations/UpdateMealPlan';
import UpdateWorkoutPlan from '../mutations/UpdateWorkoutPlan';

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

  getItems(category, viewer) {
    const items = viewer[category];

    if (!items) {
      throw new Error('Type is invalid');
    }

    return items;
  }

  getItemById(category, viewer, id) {
    const items = this.getItems(category, viewer);

    return _.find(_.map(items.edges, 'node'), ['id', id]);
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

  updateItemById(category, id, data, viewer) {
    const mutationsByCategory = {
      [CATEGORY.MUSCLES.type]: UpdateMuscle,
      [CATEGORY.EXERCISES.type]: UpdateExercise,
      [CATEGORY.FOODS.type]: UpdateFood,
      [CATEGORY.MEAL_PLANS.type]: UpdateMealPlan,
      [CATEGORY.WORKOUT_PLANS.type]: UpdateWorkoutPlan,
    };

    const RenameMutation = mutationsByCategory[category];

    if (!RenameMutation) {
      throw new Error(`Raname mutation is not supported for ${category}`);
    }

    return RenameMutation(id, data, viewer);
  }
}

export default new ManageService();
