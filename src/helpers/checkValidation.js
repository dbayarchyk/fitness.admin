// Config example:
// {
//   'fieldProp': {
//     isValid: item => valid condition,
//   }
// }

const checkValidation = (validateObject, config) => {
  let isValid = true;
  
  Object.keys(validateObject).forEach((key) => {
    if (config[key] && config[key].isValid && !config[key].isValid(validateObject[key])) {
      isValid = false;
    }
  });

  return isValid;
}

export default checkValidation;
