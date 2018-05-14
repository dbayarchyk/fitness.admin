import { graphql } from 'react-relay';

export default graphql`
  fragment ManageMealPlanTemplates_viewer on Viewer
    @argumentDefinitions (
      sort: { type: "String" },
      name: { type: "String" }
    ) {
      id
      mealPlanTemplates(
        first: 2147483647,  # max GraphQLInt
        sort: $sort,
        name: $name
      )
      @connection(key: "ManageMealPlanTemplates_mealPlanTemplates", filters: []) {
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