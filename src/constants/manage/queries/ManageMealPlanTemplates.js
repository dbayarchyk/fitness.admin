import { graphql } from 'react-relay';

export default graphql`
  query ManageMealPlanTemplatesQuery (
    $sort: String,
    $name: String,
  ) {
    viewer {
      ...ManageMealPlanTemplates_viewer
      @arguments(
        sort: $sort,
        name: $name
      )
    }
  }
`;