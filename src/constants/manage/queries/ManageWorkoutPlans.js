import { graphql } from 'react-relay';

export default graphql`
  query ManageWorkoutPlansQuery (
    $sort: String,
  ) {
    viewer {
      ...ManageWorkoutPlans_viewer
      @arguments(
        sort: $sort
      )
    }
  }
`;