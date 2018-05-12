import { 
  commitMutation,
  graphql,
} from 'react-relay';

import Environment from '../Environment';

const mutation = graphql`
  mutation RemoveFoodMutation ($input: RemoveFoodInput!) {
    removeFood(input: $input) {
      removedFood {
        id
      }
    }
  }
`;

const RemoveFoodMutation = (foodId, viewer) => {
  const variables = {
    input: {
      foodId,
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

export default RemoveFoodMutation;
