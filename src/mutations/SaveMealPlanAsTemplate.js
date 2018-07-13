import {
  commitMutation,
  graphql,
} from 'react-relay';

import Environment from '../Environment';

const mutation = graphql`
  mutation SaveMealPlanAsTemplateMutation ($input: SaveMealPlanTemplateAsTemplateInput!) {
    saveMealPlanAsTemplate(input: $input) {
      mealPlanTemplateEdge {
        cursor
        node {
          id
          name
        }
      }
    }
  }
`;

const SaveMealPlanAsTemplateMutation = (id, templateName) => {
  const variables = {
    input: {
      id,
      templateName,
    },
  };

  return new Promise((resolve, reject) => {
    commitMutation(Environment, {
      mutation,
      variables,
      onCompleted: (response, errors) => {
        if (errors && errors.length) {
          reject(errors);
        } else {
          resolve(response);
        }
      },
      onError: err => reject(err),
    });
  });
};

export default SaveMealPlanAsTemplateMutation;
