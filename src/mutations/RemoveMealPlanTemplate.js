import { 
  commitMutation,
  graphql,
} from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

import Environment from '../Environment';

const sharedUpdater = (store, viewer, removedMealPlanTemplate) => {
  const viewerProxy = store.get(viewer.id);

  const conn = ConnectionHandler.getConnection(
    viewerProxy,
    'ManageMealPlanTemplates_mealPlanTemplates',
  );

  ConnectionHandler.deleteNode(
    conn,
    removedMealPlanTemplate.getValue('id'),
  );
};

const mutation = graphql`
  mutation RemoveMealPlanTemplateMutation ($input: RemoveMealPlanTemplateInput!) {
    removeMealPlanTemplate(input: $input) {
      removedMealPlanTemplate {
        id
      }
    }
  }
`;

const RemoveMealPlanTemplateMutation = (mealPlanTemplateId, viewer) => {
  const variables = {
    input: {
      mealPlanTemplateId,
      clientMutationId: '',
    },
  };

  return new Promise((resolve, reject) => {
    commitMutation(Environment, {
      mutation,
      variables,
      updater: (store) => {
        const payload = store.getRootField('removeMealPlanTemplate');

        sharedUpdater(store, viewer, payload.getLinkedRecord('removedMealPlanTemplate'));
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

export default RemoveMealPlanTemplateMutation;
