import {
  commitMutation,
  graphql,
} from 'react-relay';

import Environment from '../Environment';

const mutation = graphql`
  mutation UpdateMealPlanTemplateMutation ($input: UpdateMealPlanTemplateInput!) {
    updateMealPlanTemplate(input: $input) {
      updatedMealPlanTemplateEdge {
        cursor
        node {
          id
          name
        }
      }
    }
  }
`;

const UpdateMealPlanTemplateMutation = (id, data) => {
  const variables = {
    input: {
      id,
      data,
      clientMutationId: '',
    },
  };

  return new Promise((resolve, reject) => {
    commitMutation(Environment, {
      mutation,
      variables,
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

export default UpdateMealPlanTemplateMutation;
