import { graphql } from 'react-relay';

export default graphql`
  query ManageWorkoutPlansQuery {
    viewer {
      workoutPlans {
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