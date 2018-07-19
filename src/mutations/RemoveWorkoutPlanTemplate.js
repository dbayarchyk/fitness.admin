import {
  commitMutation,
  graphql,
} from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

import Environment from '../Environment';

const sharedUpdater = (store, viewer, removedWorkoutPlanTemplate) => {
  const viewerProxy = store.get(viewer.id);

  const conn = ConnectionHandler.getConnection(
    viewerProxy,
    'ManageWorkoutPlanTemplates_workoutPlanTemplates',
  );

  ConnectionHandler.deleteNode(
    conn,
    removedWorkoutPlanTemplate.getValue('id'),
  );
};

const mutation = graphql`
  mutation RemoveWorkoutPlanTemplateMutation ($input: RemoveWorkoutPlanTemplateInput!) {
    removeWorkoutPlanTemplate(input: $input) {
      removedWorkoutPlanTemplate {
        id
      }
    }
  }
`;

const RemoveWorkoutPlanTemplateMutation = (workoutPlanTemplateId, viewer) => {
  const variables = {
    input: {
      workoutPlanTemplateId,
      clientMutationId: '',
    },
  };

  return new Promise((resolve, reject) => {
    commitMutation(Environment, {
      mutation,
      variables,
      updater: (store) => {
        const payload = store.getRootField('removeWorkoutPlanTemplate');

        sharedUpdater(store, viewer, payload.getLinkedRecord('removedWorkoutPlanTemplate'));
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

export default RemoveWorkoutPlanTemplateMutation;
