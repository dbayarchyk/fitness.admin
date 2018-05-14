import CATEGORY from '../category';
import ManageMusclesQuery from './ManageMuscles';
import ManageExercisesQuery from './ManageExercises'
import ManageUsersQuery from './ManageUsers';
import ManageFoodsQuery from './ManageFoods';
import ManageMealPlansQuery from './ManageMealPlans';
import ManageMealPlanTemplatesQuery from './ManageMealPlanTemplates';
import ManageWorkoutPlansQuery from './ManageWorkoutPlans';
import ManageWorkoutPlanTemplatesQuery from './ManageWorkoutPlanTemplates';

const QUERIES = {
  [CATEGORY.MUSCLES.type]: ManageMusclesQuery,
  [CATEGORY.EXERCISES.type]: ManageExercisesQuery,
  [CATEGORY.USERS.type]: ManageUsersQuery,
  [CATEGORY.FOODS.type]: ManageFoodsQuery,
  [CATEGORY.MEAL_PLANS.type]: ManageMealPlansQuery,
  [CATEGORY.MEAL_PLAN_TEMPLATES.type]: ManageMealPlanTemplatesQuery,
  [CATEGORY.WORKOUT_PLANS.type]: ManageWorkoutPlansQuery,
  [CATEGORY.WORKOUT_PLAN_TEMPLATES.type]: ManageWorkoutPlanTemplatesQuery,
};

export default QUERIES;
