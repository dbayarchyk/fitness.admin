import { graphql } from 'react-relay';

export default graphql`
  query ManageUsersRefetchQuery (
    $sort: String,
  ) {
    viewer {
      ...ManageUsers_viewer
      @arguments(
        sort: $sort
      )
    }
  }
`;
