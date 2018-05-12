import { 
  commitMutation,
  graphql,
} from 'react-relay';

import Environment from '../Environment';

const mutation = graphql`
  mutation RemoveMealPlanMutation ($input: RemoveMealPlanInput!) {
    removeMealPlan(input: $input) {
      removedMealPlan {
        id
      }
    }
  }
`;

const RemoveMealPlanMutation = (mealPlanId, viewer) => {
  const variables = {
    input: {
      mealPlanId,
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

export default RemoveMealPlanMutation;
