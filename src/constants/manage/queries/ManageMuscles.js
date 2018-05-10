import { graphql } from 'react-relay';

export default graphql`
  query ManageMusclesQuery (
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