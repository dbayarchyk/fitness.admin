import { 
  commitMutation,
  graphql,
} from 'react-relay';

import Environment from '../Environment';

const mutation = graphql`
  mutation RemoveExerciseMutation ($input: RemoveExerciseInput!) {
    removeExercise(input: $input) {
      removedExercise {
        id
      }
    }
  }
`;

const RemoveExerciseMutation = (exerciseId, viewer) => {
  const variables = {
    input: {
      exerciseId,
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

export default RemoveExerciseMutation;
