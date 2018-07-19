import {
  commitMutation,
  graphql,
} from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

import Environment from '../Environment';

const sharedUpdater = (store, viewer, removedFood) => {
  const viewerProxy = store.get(viewer.id);

  const conn = ConnectionHandler.getConnection(
    viewerProxy,
    'ManageFoods_foods',
  );

  ConnectionHandler.deleteNode(
    conn,
    removedFood.getValue('id'),
  );
};

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
      updater: (store) => {
        const payload = store.getRootField('removeFood');

        sharedUpdater(store, viewer, payload.getLinkedRecord('removedFood'));
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

export default RemoveFoodMutation;
