import CATEGORY from '../category';
import ManageMusclesFragment from './ManageMuscles';
import ManageExercisesFragment from './ManageExercises'
import ManageUsersFragment from './ManageUsers';
import ManageFoodsFragment from './ManageFoods';
import ManageMealPlansFragment from './ManageMealPlans';
import ManageWorkoutPlansFragment from './ManageWorkoutPlans';

const FRAGMENTS = {
  [CATEGORY.MUSCLES.type]: ManageMusclesFragment,
  [CATEGORY.EXERCISES.type]: ManageExercisesFragment,
  [CATEGORY.USERS.type]: ManageUsersFragment,
  [CATEGORY.FOODS.type]: ManageFoodsFragment,
  [CATEGORY.MEAL_PLANS.type]: ManageMealPlansFragment,
  [CATEGORY.WORKOUT_PLANS.type]: ManageWorkoutPlansFragment,
};

export default FRAGMENTS;
