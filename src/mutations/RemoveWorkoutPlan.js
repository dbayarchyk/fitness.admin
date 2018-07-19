import {
  commitMutation,
  graphql,
} from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

import Environment from '../Environment';

const sharedUpdater = (store, viewer, removedWorkoutPlan) => {
  const viewerProxy = store.get(viewer.id);

  const conn = ConnectionHandler.getConnection(
    viewerProxy,
    'ManageWorkoutPlans_workoutPlans',
  );

  ConnectionHandler.deleteNode(
    conn,
    removedWorkoutPlan.getValue('id'),
  );
};

const mutation = graphql`
  mutation RemoveWorkoutPlanMutation ($input: RemoveWorkoutPlanInput!) {
    removeWorkoutPlan(input: $input) {
      removedWorkoutPlan {
        id
      }
    }
  }
`;

const RemoveWorkoutPlanMutation = (workoutPlanId, viewer) => {
  const variables = {
    input: {
      workoutPlanId,
      clientMutationId: '',
    },
  };

  return new Promise((resolve, reject) => {
    commitMutation(Environment, {
      mutation,
      variables,
      updater: (store) => {
        const payload = store.getRootField('removeWorkoutPlan');

        sharedUpdater(store, viewer, payload.getLinkedRecord('removedWorkoutPlan'));
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

export default RemoveWorkoutPlanMutation;
