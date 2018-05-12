import { graphql } from 'react-relay';

export default graphql`
  fragment ManageUsers_viewer on Viewer
    @argumentDefinitions (
      sort: { type: "String" },
      name: { type: "String" }
    ) {
      id
      users(
        first: 2147483647,  # max GraphQLInt
        sort: $sort,
        name: $name
      )
      @connection(key: "ManageUsers_users", filters: []) {
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
