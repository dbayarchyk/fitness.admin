import { graphql } from 'react-relay';

export default graphql`
  query ManageWorkoutPlansRefetchQuery (
    $sort: String,
    $name: String,
  ) {
    viewer {
      ...ManageWorkoutPlans_viewer
      @arguments(
        sort: $sort,
        name: $name
      )
    }
  }
`;
