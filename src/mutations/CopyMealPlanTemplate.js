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
    'ManageMealPlanTemplates_mealPlanTemplates',
  );

  ConnectionHandler.insertEdgeAfter(
    conn,
    copiedEdge,
    insertAfter,
  );
};

const mutation = graphql`
  mutation CopyMealPlanTemplateMutation ($input: CopyMealPlanTemplateInput!) {
    copyMealPlanTemplate(input: $input) {
      copiedMealPlanTemplateEdge {
        cursor
        node {
          id
          name
        }
      }
    }
  }
`;

const CopyMealPlanTemplateMutation = (id, viewer, insertAfter) => {
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
        const payload = store.getRootField('copyMealPlanTemplate');

        sharedUpdater(store, viewer, payload.getLinkedRecord('copiedMealPlanTemplateEdge'), insertAfter);
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

export default CopyMealPlanTemplateMutation;
