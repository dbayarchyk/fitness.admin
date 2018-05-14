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
    'ManageMuscles_muscles',
  );

  ConnectionHandler.insertEdgeAfter(
    conn,
    copiedEdge,
    insertAfter,
  );
};

const mutation = graphql`
  mutation CopyMuscleMutation ($input: CopyMuscleInput!) {
    copyMuscle(input: $input) {
      copiedMuscleEdge {
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

const CopyMuscleMutation = (id, viewer, insertAfter) => {
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
        const payload = store.getRootField('copyMuscle');

        sharedUpdater(store, viewer, payload.getLinkedRecord('copiedMuscleEdge'), insertAfter);
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

export default CopyMuscleMutation;
