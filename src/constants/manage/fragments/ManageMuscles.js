import { graphql } from 'react-relay';

export default graphql`
  fragment ManageMuscles_viewer on Viewer
  @argumentDefinitions (
    sort: { type: "String" },
    name: { type: "String" }
  ) {
      id
      muscles(
        first: 2147483647,  # max GraphQLInt
        sort: $sort,
        name: $name
      )
      @connection(key: "ManageMuscles_muscles", filters: []) {
        edges {
          node {
            id
            name
            group
            createdAt
            updatedAt
          }
        }
      }
    }
`;
