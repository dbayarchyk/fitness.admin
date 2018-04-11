import { graphql } from 'react-relay';

export default graphql`
  query ManageExercisesQuery {
    viewer {
      exercises {
        edges {
          node {
            id
            name
            avatarUrl
            muscles {
              edges {
                node {
                  name
                }
              }
            }
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`;