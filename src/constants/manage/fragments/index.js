import CATEGORY from '../category';
import ManageMusclesFragment from './ManageMuscles';
import ManageExercisesFragment from './ManageExercises';
import ManageUsersFragment from './ManageUsers';
import ManageFoodsFragment from './ManageFoods';
import ManageMealPlansFragment from './ManageMealPlans';
import ManageMealPlanTemplatesFragment from './ManageMealPlanTemplates';
import ManageWorkoutPlansFragment from './ManageWorkoutPlans';
import ManageWorkoutPlanTemplatesFragment from './ManageWorkoutPlanTemplates';

const FRAGMENTS = {
  [CATEGORY.MUSCLES.type]: ManageMusclesFragment,
  [CATEGORY.EXERCISES.type]: ManageExercisesFragment,
  [CATEGORY.USERS.type]: ManageUsersFragment,
  [CATEGORY.FOODS.type]: ManageFoodsFragment,
  [CATEGORY.MEAL_PLANS.type]: ManageMealPlansFragment,
  [CATEGORY.MEAL_PLAN_TEMPLATES.type]: ManageMealPlanTemplatesFragment,
  [CATEGORY.WORKOUT_PLANS.type]: ManageWorkoutPlansFragment,
  [CATEGORY.WORKOUT_PLAN_TEMPLATES.type]: ManageWorkoutPlanTemplatesFragment,
};

export default FRAGMENTS;
