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
    'ManageMealPlans_mealPlans',
  );

  ConnectionHandler.insertEdgeAfter(
    conn,
    copiedEdge,
    insertAfter,
  );
};

const mutation = graphql`
  mutation CopyMealPlanMutation ($input: CopyMealPlanInput!) {
    copyMealPlan(input: $input) {
      copiedMealPlanEdge {
        cursor
        node {
          id
          name
        }
      }
    }
  }
`;

const CopyMealPlanMutation = (id, viewer, insertAfter) => {
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
        const payload = store.getRootField('copyMealPlan');

        sharedUpdater(store, viewer, payload.getLinkedRecord('copiedMealPlanEdge'), insertAfter);
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

export default CopyMealPlanMutation;
