import { graphql } from 'react-relay';

export default graphql`
  query ManageFoodsQuery (
    $sort: String,
    $name: String,
  ) {
    viewer {
      ...ManageFoods_viewer
      @arguments(
        sort: $sort,
        name: $name
      )
    }
  }
`;
