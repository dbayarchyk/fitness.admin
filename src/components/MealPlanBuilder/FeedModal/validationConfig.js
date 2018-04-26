export default {
  food: {
    isValid: food => food && food.id,
  },
  weight: {
    isValid: weight => weight && Number(weight) && Number(weight) > 0 && Number(weight) < 2000,
  },
};