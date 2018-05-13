import { 
  commitMutation,
  graphql,
} from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

import Environment from '../Environment';

const sharedUpdater = (store, viewer, removedExercise) => {
  const viewerProxy = store.get(viewer.id);

  const conn = ConnectionHandler.getConnection(
    viewerProxy,
    'ManageExercises_exercises',
  );

  ConnectionHandler.deleteNode(
    conn,
    removedExercise.getValue('id'),
  );
};

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
      updater: (store) => {
        const payload = store.getRootField('removeExercise');

        sharedUpdater(store, viewer, payload.getLinkedRecord('removedExercise'));
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

export default RemoveExerciseMutation;
