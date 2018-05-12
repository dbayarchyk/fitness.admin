import { graphql } from 'react-relay';

export default graphql`
  fragment ManageExercises_viewer on Viewer
    @argumentDefinitions (
      sort: { type: "String" },
      name: { type: "String" }
    ) {
      id
      exercises(sort: $sort, name: $name) {
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