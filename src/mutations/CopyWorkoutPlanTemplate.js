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
    'ManageWorkoutPlanTemplates_workoutPlanTemplates',
  );

  ConnectionHandler.insertEdgeAfter(
    conn,
    copiedEdge,
    insertAfter,
  );
};

const mutation = graphql`
  mutation CopyWorkoutPlanTemplateMutation ($input: CopyWorkoutPlanTemplateInput!) {
    copyWorkoutPlanTemplate(input: $input) {
      copiedWorkoutPlanTemplateEdge {
        cursor
        node {
          id
          name
        }
      }
    }
  }
`;

const CopyWorkoutPlanTemplateMutation = (id, viewer, insertAfter) => {
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
        const payload = store.getRootField('copyWorkoutPlanTemplate');

        sharedUpdater(store, viewer, payload.getLinkedRecord('copiedWorkoutPlanTemplateEdge'), insertAfter);
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

export default CopyWorkoutPlanTemplateMutation;
