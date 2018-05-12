import { graphql } from 'react-relay';

export default graphql`
  fragment ManageExercises_viewer on Viewer
    @argumentDefinitions (
      sort: { type: "String" },
      name: { type: "String" }
    ) {
      id
      exercises(
        first: 2147483647,  # max GraphQLInt
        sort: $sort,
        name: $name
      )
      @connection(key: "ManageExercises_exercises", filters: []) {
        edges {
          node {
            id
            name
            avatarUrl
            muscles {
              edges {
                node {
                  name
                }
              }
            }
            createdAt
            updatedAt
          }
        }
      }
    }
`;