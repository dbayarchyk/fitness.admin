import {
  commitMutation,
  graphql,
} from 'react-relay';

import Environment from '../Environment';

const mutation = graphql`
  mutation UpdateExerciseMutation ($input: UpdateExerciseInput!) {
    updateExercise(input: $input) {
      updatedExerciseEdge {
        cursor
        node {
          id
          name
          avatarUrl
          muscles {
            edges {
              node {
                name
              }
            }
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;

const UpdateExerciseMutation = (id, data) => {
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

export default UpdateExerciseMutation;
