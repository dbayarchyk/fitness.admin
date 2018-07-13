import {
  commitMutation,
  graphql,
} from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

import Environment from '../Environment';

const sharedUpdater = (store, viewer, removedMealPlan) => {
  const viewerProxy = store.get(viewer.id);

  const conn = ConnectionHandler.getConnection(
    viewerProxy,
    'ManageMealPlans_mealPlans',
  );

  ConnectionHandler.deleteNode(
    conn,
    removedMealPlan.getValue('id'),
  );
};

const mutation = graphql`
  mutation RemoveMealPlanMutation ($input: RemoveMealPlanInput!) {
    removeMealPlan(input: $input) {
      removedMealPlan {
        id
      }
    }
  }
`;

const RemoveMealPlanMutation = (mealPlanId, viewer) => {
  const variables = {
    input: {
      mealPlanId,
      clientMutationId: '',
    },
  };

  return new Promise((resolve, reject) => {
    commitMutation(Environment, {
      mutation,
      variables,
      updater: (store) => {
        const payload = store.getRootField('removeMealPlan');

        sharedUpdater(store, viewer, payload.getLinkedRecord('removedMealPlan'));
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

export default RemoveMealPlanMutation;
