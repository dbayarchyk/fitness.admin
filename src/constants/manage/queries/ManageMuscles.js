import { graphql } from 'react-relay';

export default graphql`
  query ManageMusclesQuery {
    viewer {
      muscles {
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
  }
`;