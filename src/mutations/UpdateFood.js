import { 
  commitMutation,
  graphql,
} from 'react-relay';

import Environment from '../Environment';

const mutation = graphql`
  mutation UpdateFoodMutation ($input: UpdateFoodInput!) {
    updateFood(input: $input) {
      updatedFoodEdge {
        cursor
        node {
          id
          name
        }
      }
    }
  }
`;

const UpdateFoodMutation = (id, data, viewer) => {
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

export default UpdateFoodMutation;
