import { graphql } from 'react-relay';

export default graphql`
  fragment ManageMuscles_viewer on Viewer
    @argumentDefinitions (
      sort: { type: "String" },
      name: { type: "String" }
    ) {
      muscles(sort: $sort, name: $name) {
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
