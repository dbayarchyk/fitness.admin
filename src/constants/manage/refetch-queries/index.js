import CATEGORY from '../category';
import ManageMusclesRefetchQuery from './ManageMuscles';
import ManageExercisesRefetchRefetchQuery from './ManageExercises'
import ManageUsersRefetchQuery from './ManageUsers';
import ManageFoodsRefetchQuery from './ManageFoods';
import ManageMealPlansRefetchQuery from './ManageMealPlans';
import ManageMealPlanTemplatesRefetchQuery from './ManageMealPlanTemplates';
import ManageWorkoutPlansRefetchQuery from './ManageWorkoutPlans';
import ManageWorkoutPlanTemplatesRefetchQuery from './ManageWorkoutPlanTemplates';

const FRAGMENTS = {
  [CATEGORY.MUSCLES.type]: ManageMusclesRefetchQuery,
  [CATEGORY.EXERCISES.type]: ManageExercisesRefetchRefetchQuery,
  [CATEGORY.USERS.type]: ManageUsersRefetchQuery,
  [CATEGORY.FOODS.type]: ManageFoodsRefetchQuery,
  [CATEGORY.MEAL_PLANS.type]: ManageMealPlansRefetchQuery,
  [CATEGORY.MEAL_PLAN_TEMPLATES.type]: ManageMealPlanTemplatesRefetchQuery,
  [CATEGORY.WORKOUT_PLANS.type]: ManageWorkoutPlansRefetchQuery,
  [CATEGORY.WORKOUT_PLAN_TEMPLATES.type]: ManageWorkoutPlanTemplatesRefetchQuery,
};

export default FRAGMENTS;
