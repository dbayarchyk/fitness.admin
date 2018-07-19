import {
  commitMutation,
  graphql,
} from 'react-relay';

import Environment from '../Environment';

const mutation = graphql`
  mutation UpdateWorkoutPlanTemplateMutation ($input: UpdateWorkoutPlanTemplateInput!) {
    updateWorkoutPlanTemplate(input: $input) {
      updatedWorkoutPlanTemplateEdge {
        cursor
        node {
          id
          name
        }
      }
    }
  }
`;

const UpdateWorkoutPlanTemplateMutation = (id, data) => {
  const variables = {
    input: {
      id,
      data,
      clientMutationId: '',
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

export default UpdateWorkoutPlanTemplateMutation;
