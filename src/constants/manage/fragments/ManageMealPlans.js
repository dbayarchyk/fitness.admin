import { graphql } from 'react-relay';

export default graphql`
  fragment ManageMealPlans_viewer on Viewer
    @argumentDefinitions (
      sort: { type: "String" },
      name: { type: "String" }
    ) {
      id
      mealPlans(sort: $sort, name: $name) {
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