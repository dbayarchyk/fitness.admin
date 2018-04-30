import { graphql } from 'react-relay';

export default graphql`
  fragment ManageUsers_viewer on Viewer
    @argumentDefinitions (
      sort: { type: "String" }
    ) {
      users(sort: $sort) {
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
`;
