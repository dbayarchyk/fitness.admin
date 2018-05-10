import { graphql } from 'react-relay';

export default graphql`
  query ManageExercisesQuery (
    $sort: String,
    $name: String,
  ) {
    viewer {
      ...ManageExercises_viewer
      @arguments(
        sort: $sort,
        name: $name
      )
    }
  }
`;