import { graphql } from 'react-relay';

export default graphql`
  query ManageWorkoutPlansQuery (
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