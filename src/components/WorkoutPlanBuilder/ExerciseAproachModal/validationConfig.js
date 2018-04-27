export default {
  exercise: {
    isValid: exercise => exercise && exercise.id,
  },
  count: {
    isValid: count => count && Number(count) && Number(count) > 0 && Number(count) < 2000,
  },
};