import { graphql } from 'react-relay';

export default graphql`
  fragment ManageMealPlans_viewer on Viewer
    @argumentDefinitions (
      sort: { type: "String" },
      name: { type: "String" }
    ) {
      id
      mealPlans(
        first: 2147483647,  # max GraphQLInt
        sort: $sort,
        name: $name
      )
      @connection(key: "ManageMealPlans_mealPlans", filters: []) {
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