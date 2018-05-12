import { graphql } from 'react-relay';

export default graphql`
  fragment ManageUsers_viewer on Viewer
    @argumentDefinitions (
      sort: { type: "String" },
      name: { type: "String" }
    ) {
      id
      users(sort: $sort, name: $name) {
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
