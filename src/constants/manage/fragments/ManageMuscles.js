import { graphql } from 'react-relay';

export default graphql`
  fragment ManageMuscles_viewer on Viewer
    @argumentDefinitions (
      sort: { type: "String" }
    ) {
      muscles(sort: $sort) {
        edges {
          node {
            id
            name
            group
            createdAt
            updatedAt
          }
        }
      }
    }
`;
