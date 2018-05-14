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
import UpdateMealPlanTemplate from '../mutations/UpdateMealPlanTemplate';
import UpdateWorkoutPlanTemplate from '../mutations/UpdateWorkoutPlanTemplate';

import RemoveExercise from '../mutations/RemoveExercise';
import RemoveMuscle from '../mutations/RemoveMuscle';
import RemoveFood from '../mutations/RemoveFood';
import RemoveMealPlan from '../mutations/RemoveMealPlan';
import RemoveWorkoutPlan from '../mutations/RemoveWorkoutPlan';
import RemoveMealPlanTemplate from '../mutations/RemoveMealPlanTemplate';
import RemoveWorkoutPlanTemplate from '../mutations/RemoveWorkoutPlanTemplate';

import CopyExercise from '../mutations/CopyExercise';
import CopyMuscle from '../mutations/CopyMuscle';
import CopyFood from '../mutations/CopyFood';
import CopyMealPlan from '../mutations/CopyMealPlan';
import CopyWorkoutPlan from '../mutations/CopyWorkoutPlan';
import CopyMealPlanTemplate from '../mutations/CopyMealPlanTemplate';
import CopyWorkoutPlanTemplate from '../mutations/CopyWorkoutPlanTemplate';

import SaveMealPlanAsTemplate from '../mutations/SaveMealPlanAsTemplate';
import SaveWorkoutPlanAsTemplate from '../mutations/SaveWorkoutPlanAsTemplate';

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

  getEdgeByItemId(category, viewer, id) {
    const items = this.getItems(category, viewer);

    return _.find(items.edges, ({ node }) => node.id === id);
  }

  getItemById(category, viewer, id) {
    const selectedEdge = this.getEdgeByItemId(category, viewer, id);

    return selectedEdge ? selectedEdge.node : null;
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
      [CATEGORY.MEAL_PLAN_TEMPLATES.type]: UpdateMealPlanTemplate,
      [CATEGORY.WORKOUT_PLAN_TEMPLATES.type]: UpdateWorkoutPlanTemplate,
    };

    const RenameMutation = mutationsByCategory[category];

    if (!RenameMutation) {
      throw new Error(`Raname mutation is not supported for ${category}`);
    }

    return RenameMutation(id, data, viewer)
            .catch((err) => {
              if (err && err.errors) {
                err.errors.forEach(error => alert(error.message));
              }
            });
  }

  removeItemById(category, id, viewer) {
    const mutationsByCategory = {
      [CATEGORY.MUSCLES.type]: RemoveMuscle,
      [CATEGORY.EXERCISES.type]: RemoveExercise,
      [CATEGORY.FOODS.type]: RemoveFood,
      [CATEGORY.MEAL_PLANS.type]: RemoveMealPlan,
      [CATEGORY.WORKOUT_PLANS.type]: RemoveWorkoutPlan,
      [CATEGORY.MEAL_PLAN_TEMPLATES.type]: RemoveMealPlanTemplate,
      [CATEGORY.WORKOUT_PLAN_TEMPLATES.type]: RemoveWorkoutPlanTemplate,
    };

    const RemoveMutation = mutationsByCategory[category];

    if (!RemoveMutation) {
      throw new Error(`Raname mutation is not supported for ${category}`);
    }

    return RemoveMutation(id, viewer)
            .catch((err) => {
              if (err && err.errors) {
                err.errors.forEach(error => alert(error.message));
              }
            });
  }

  copyItemById(category, id, viewer, insertAfter) {
    const mutationsByCategory = {
      [CATEGORY.MUSCLES.type]: CopyMuscle,
      [CATEGORY.EXERCISES.type]: CopyExercise,
      [CATEGORY.FOODS.type]: CopyFood,
      [CATEGORY.MEAL_PLANS.type]: CopyMealPlan,
      [CATEGORY.WORKOUT_PLANS.type]: CopyWorkoutPlan,
      [CATEGORY.MEAL_PLAN_TEMPLATES.type]: CopyMealPlanTemplate,
      [CATEGORY.WORKOUT_PLAN_TEMPLATES.type]: CopyWorkoutPlanTemplate,
    };

    const CopyMutation = mutationsByCategory[category];

    if (!CopyMutation) {
      throw new Error(`Copy mutation is not supported for ${category}`);
    }

    return CopyMutation(id, viewer, insertAfter)
            .catch((err) => {
              if (err && err.errors) {
                err.errors.forEach(error => alert(error.message));
              }
            });
  }

  saveItemAsTemplate(category, id, templateName, viewer) {
    const mutationsByCategory = {
      [CATEGORY.MEAL_PLANS.type]: SaveMealPlanAsTemplate,
      [CATEGORY.WORKOUT_PLANS.type]: SaveWorkoutPlanAsTemplate,
    };

    const SaveAsTemplateMutation = mutationsByCategory[category];

    if (!SaveAsTemplateMutation) {
      throw new Error(`Copy mutation is not supported for ${category}`);
    }

    return SaveAsTemplateMutation(id, templateName, viewer)
            .then(() => alert('Saved'))
            .catch((err) => {
              if (err && err.errors) {
                err.errors.forEach(error => alert(error.message));
              }
            });
  }
}

export default new ManageService();
