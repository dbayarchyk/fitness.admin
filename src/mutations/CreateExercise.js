import { 
  commitMutation,
  graphql,
} from 'react-relay';

import Environment from '../Environment';

const mutation = graphql`
  mutation CreateExerciseMutation ($input: CreateExerciseInput!) {
    createExercise(input: $input) {
      createdExerciseEdge {
        cursor
        node {
          id
          name
        }
      }
    }
  }
`;

const CreateExerciseMutation = (data, viewer) => {
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

export default CreateExerciseMutation;
