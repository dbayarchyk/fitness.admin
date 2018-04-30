import { graphql } from 'react-relay';

export default graphql`
  query ManageMusclesQuery (
    $sort: String,
  ) {
    viewer {
      ...ManageMuscles_viewer
      @arguments(
        sort: $sort
      )
    }
  }
`;