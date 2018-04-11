import { graphql } from 'react-relay';

export default graphql`
  query ManageUsersQuery {
    viewer {
      users {
        edges {
          node {
            id
            name
            surname
            email
            age
            purpose
            role
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`;