import { graphql } from 'react-relay';

export default graphql`
  query ManageWorkoutPlanTemplatesQuery (
    $sort: String,
    $name: String,
  ) {
    viewer {
      ...ManageWorkoutPlanTemplates_viewer
      @arguments(
        sort: $sort,
        name: $name
      )
    }
  }
`;
