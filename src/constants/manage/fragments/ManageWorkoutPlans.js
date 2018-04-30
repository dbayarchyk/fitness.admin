import { graphql } from 'react-relay';

export default graphql`
  fragment ManageWorkoutPlans_viewer on Viewer
    @argumentDefinitions (
      sort: { type: "String" }
    ) {
      workoutPlans(sort: $sort) {
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
