import { graphql } from 'react-relay';

export default graphql`
  query ManageExercisesRefetchQuery (
    $sort: String,
  ) {
    viewer {
      ...ManageExercises_viewer
      @arguments(
        sort: $sort
      )
    }
  }
`;
