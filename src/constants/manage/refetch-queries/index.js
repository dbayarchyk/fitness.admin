import CATEGORY from '../category';
import ManageMusclesRefetchQuery from './ManageMuscles';
import ManageExercisesRefetchRefetchQuery from './ManageExercises'
import ManageUsersRefetchQuery from './ManageUsers';
import ManageFoodsRefetchQuery from './ManageFoods';
import ManageMealPlansRefetchQuery from './ManageMealPlans';
import ManageWorkoutPlansRefetchQuery from './ManageWorkoutPlans';

const FRAGMENTS = {
  [CATEGORY.MUSCLES.type]: ManageMusclesRefetchQuery,
  [CATEGORY.EXERCISES.type]: ManageExercisesRefetchRefetchQuery,
  [CATEGORY.USERS.type]: ManageUsersRefetchQuery,
  [CATEGORY.FOODS.type]: ManageFoodsRefetchQuery,
  [CATEGORY.MEAL_PLANS.type]: ManageMealPlansRefetchQuery,
  [CATEGORY.WORKOUT_PLANS.type]: ManageWorkoutPlansRefetchQuery,
};

export default FRAGMENTS;
