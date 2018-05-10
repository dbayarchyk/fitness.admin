import { graphql } from 'react-relay';

export default graphql`
  query ManageMusclesRefetchQuery (
    $sort: String,
    $name: String,
  ) {
    viewer {
      ...ManageMuscles_viewer
      @arguments(
        sort: $sort,
        name: $name
      )
    }
  }
`;
