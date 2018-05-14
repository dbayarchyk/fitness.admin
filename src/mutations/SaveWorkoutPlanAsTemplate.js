import { 
  commitMutation,
  graphql,
} from 'react-relay';

import Environment from '../Environment';

const mutation = graphql`
  mutation SaveWorkoutPlanAsTemplateMutation ($input: SaveWorkoutPlanTemplateAsTemplateInput!) {
    saveWorkoutPlanAsTemplate(input: $input) {
      workoutPlanTemplateEdge {
        cursor
        node {
          id
          name
        }
      }
    }
  }
`;

const SaveWorkoutPlanAsTemplateMutation = (id, templateName, viewer) => {
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

export default SaveWorkoutPlanAsTemplateMutation;
