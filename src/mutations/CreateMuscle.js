import { 
  commitMutation,
  graphql,
} from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

import Environment from '../Environment';

const mutation = graphql`
  mutation CreateMuscleMutation ($input: CreateMuscleInput!) {
    createMuscle(input: $input) {
      createdMuscleEdge {
        cursor
        node {
          id
          name
          group
        }
      }
    }
  }
`;

const CreateMuscleMutation = (data, viewer) => {
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
        resolve(response);
      },
      onError: err => reject(err),
    });
  });
};

export default CreateMuscleMutation;
