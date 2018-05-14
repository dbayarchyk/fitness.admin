import { 
  commitMutation,
  graphql,
} from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

import Environment from '../Environment';

const sharedUpdater = (store, viewer, copiedEdge, insertAfter) => {
  const viewerProxy = store.get(viewer.id);

  const conn = ConnectionHandler.getConnection(
    viewerProxy,
    'ManageExercises_exercises',
  );

  ConnectionHandler.insertEdgeAfter(
    conn,
    copiedEdge,
    insertAfter,
  );
};

const mutation = graphql`
  mutation CopyExerciseMutation ($input: CopyExerciseInput!) {
    copyExercise(input: $input) {
      copiedExerciseEdge {
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

const CopyExerciseMutation = (id, viewer, insertAfter) => {
  const variables = {
    input: {
      id,
      clientMutationId: '',
    },
  };

  return new Promise((resolve, reject) => {
    commitMutation(Environment, {
      mutation,
      variables,
      updater: (store) => {
        const payload = store.getRootField('copyExercise');

        sharedUpdater(store, viewer, payload.getLinkedRecord('copiedExerciseEdge'), insertAfter);
      },
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

export default CopyExerciseMutation;
