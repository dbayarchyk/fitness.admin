import { graphql } from 'react-relay';

export default graphql`
  query ManageMealPlansQuery {
    viewer {
      mealPlans {
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
  }
`;