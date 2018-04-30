import { graphql } from 'react-relay';

export default graphql`
  query ManageMusclesRefetchQuery (
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
