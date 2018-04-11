import { graphql } from 'react-relay';

export default graphql`
  query ManageFoodsQuery {
    viewer {
      foods {
        edges {
          node {
            id
            name
            category
            avatarUrl
            calorificValue
            proteins
            carbohydrates
            fats
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`;