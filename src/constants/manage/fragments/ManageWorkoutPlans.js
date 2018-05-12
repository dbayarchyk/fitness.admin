import { graphql } from 'react-relay';

export default graphql`
  fragment ManageWorkoutPlans_viewer on Viewer
    @argumentDefinitions (
      sort: { type: "String" },
      name: { type: "String" }
    ) {
      id
      workoutPlans(
        first: 2147483647,  # max GraphQLInt
        sort: $sort,
        name: $name
      )
      @connection(key: "ManageWorkoutPlans_workoutPlans", filters: []) {
        edges {
          node {
            id
            name
            avatarUrl
            createdAt
            updatedAt
          }
        }
      }
    }
`;
