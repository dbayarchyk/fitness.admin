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

const CreateWorkoutPlanMutation = (data, viewer) => {
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
        resolve(response);
      },
      onError: err => reject(err),
    });
  });
};

export default CreateWorkoutPlanMutation;
