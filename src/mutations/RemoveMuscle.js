import { 
  commitMutation,
  graphql,
} from 'react-relay';

import Environment from '../Environment';

const mutation = graphql`
  mutation RemoveMuscleMutation ($input: RemoveMuscleInput!) {
    removeMuscle(input: $input) {
      removedMuscle {
        id
      }
    }
  }
`;

const RemoveMuscleMutation = (muscleId, viewer) => {
  const variables = {
    input: {
      muscleId,
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

export default RemoveMuscleMutation;
