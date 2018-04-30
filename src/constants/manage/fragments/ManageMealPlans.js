import { graphql } from 'react-relay';

export default graphql`
  fragment ManageMealPlans_viewer on Viewer
    @argumentDefinitions (
      sort: { type: "String" }
    ) {
      mealPlans(sort: $sort) {
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