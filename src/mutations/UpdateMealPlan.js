import { 
  commitMutation,
  graphql,
} from 'react-relay';

import Environment from '../Environment';

const mutation = graphql`
  mutation UpdateMealPlanMutation ($input: UpdateMealPlanInput!) {
    updateMealPlan(input: $input) {
      updatedMealPlanEdge {
        cursor
        node {
          id
          name
        }
      }
    }
  }
`;

const UpdateMealPlanMutation = (id, data, viewer) => {
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

export default UpdateMealPlanMutation;
