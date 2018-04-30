import { graphql } from 'react-relay';

export default graphql`
  query ManageMealPlansRefetchQuery (
    $sort: String,
  ) {
    viewer {
      ...ManageMealPlans_viewer
      @arguments(
        sort: $sort
      )
    }
  }
`;
