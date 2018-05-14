import { graphql } from 'react-relay';

export default graphql`
  fragment ManageWorkoutPlanTemplates_viewer on Viewer
    @argumentDefinitions (
      sort: { type: "String" },
      name: { type: "String" }
    ) {
      id
      workoutPlanTemplates(
        first: 2147483647,  # max GraphQLInt
        sort: $sort,
        name: $name
      )
      @connection(key: "ManageWorkoutPlanTemplates_workoutPlanTemplates", filters: []) {
        edges {
          cursor
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
