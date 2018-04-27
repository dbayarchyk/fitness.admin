import { 
  commitMutation,
  graphql,
} from 'react-relay';

import Environment from '../Environment';

const mutation = graphql`
  mutation UpdateWorkoutPlanMutation ($input: UpdateWorkoutPlanInput!) {
    updateWorkoutPlan(input: $input) {
      updatedWorkoutPlanEdge {
        cursor
        node {
          id
          name
        }
      }
    }
  }
`;

const UpdateWorkoutPlanMutation = (id, data, viewer) => {
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
        resolve(response);
      },
      onError: err => reject(err),
    });
  });
};

export default UpdateWorkoutPlanMutation;
