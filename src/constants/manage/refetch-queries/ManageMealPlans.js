import { graphql } from 'react-relay';

export default graphql`
  query ManageMealPlansRefetchQuery (
    $sort: String,
    $name: String,
  ) {
    viewer {
      ...ManageMealPlans_viewer
      @arguments(
        sort: $sort,
        name: $name
      )
    }
  }
`;
