import { 
  commitMutation,
  graphql,
} from 'react-relay';

import Environment from '../Environment';

const mutation = graphql`
  mutation RemoveWorkoutPlanMutation ($input: RemoveWorkoutPlanInput!) {
    removeWorkoutPlan(input: $input) {
      removedWorkoutPlan {
        id
      }
    }
  }
`;

const RemoveWorkoutPlanMutation = (workoutPlanId, viewer) => {
  const variables = {
    input: {
      workoutPlanId,
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

export default RemoveWorkoutPlanMutation;
