import { 
  commitMutation,
  graphql,
} from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

import Environment from '../Environment';

const sharedUpdater = (store, viewer, removedMuscle) => {
  const viewerProxy = store.get(viewer.id);

  const conn = ConnectionHandler.getConnection(
    viewerProxy,
    'ManageMuscles_muscles',
  );

  ConnectionHandler.deleteNode(
    conn,
    removedMuscle.getValue('id'),
  );
};

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
      updater: (store) => {
        const payload = store.getRootField('removeMuscle');

        sharedUpdater(store, viewer, payload.getLinkedRecord('removedMuscle'));
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

export default RemoveMuscleMutation;
