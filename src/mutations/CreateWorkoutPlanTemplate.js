import { 
  commitMutation,
  graphql,
} from 'react-relay';

import Environment from '../Environment';

const mutation = graphql`
  mutation CreateWorkoutPlanTemplateMutation ($input: CreateWorkoutPlanTemplateInput!) {
    createWorkoutPlanTemplate(input: $input) {
      createdWorkoutPlanTemplateEdge {
        cursor
        node {
          id
          name
        }
      }
    }
  }
`;

const CreateWorkoutPlanTemplateMutation = (data, viewer) => {
  const variables = {
    input: {
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

export default CreateWorkoutPlanTemplateMutation;
