import CATEGORY from '../category';
import ManageMusclesQuery from './ManageMuscles';
import ManageExercisesQuery from './ManageExercises'
import ManageUsersQuery from './ManageUsers';
import ManageFoodsQuery from './ManageFoods';
import ManageMealPlansQuery from './ManageMealPlans';
import ManageWorkoutPlansQuery from './ManageWorkoutPlans';

const QUERIES = {
  [CATEGORY.MUSCLES.type]: ManageMusclesQuery,
  [CATEGORY.EXERCISES.type]: ManageExercisesQuery,
  [CATEGORY.USERS.type]: ManageUsersQuery,
  [CATEGORY.FOODS.type]: ManageFoodsQuery,
  [CATEGORY.MEAL_PLANS.type]: ManageMealPlansQuery,
  [CATEGORY.WORKOUT_PLANS.type]: ManageWorkoutPlansQuery,
};

export default QUERIES;
