import {
  commitMutation,
  graphql,
} from 'react-relay';

import Environment from '../Environment';

const mutation = graphql`
  mutation CreateWorkoutPlanMutation ($input: CreateWorkoutPlanInput!) {
    createWorkoutPlan(input: $input) {
      createdWorkoutPlanEdge {
        cursor
        node {
          id
          name
        }
      }
    }
  }
`;

const CreateWorkoutPlanMutation = (data) => {
  const variables = {
    input: {
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

export default CreateWorkoutPlanMutation;
