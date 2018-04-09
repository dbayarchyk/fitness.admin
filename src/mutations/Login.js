import { 
  commitMutation,
  graphql,
} from 'react-relay';

import environment from '../Environment';

const mutation = graphql`
  mutation LoginMutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token,
    }
  }
`;

const LoginMutation = (email, password) => {
  const variables = {
    email,
    password,
  };

  return new Promise((resolve, reject) => {
    commitMutation(environment, {
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

export default LoginMutation;
