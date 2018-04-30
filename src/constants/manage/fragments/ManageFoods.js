import { graphql } from 'react-relay';

export default graphql`
  fragment ManageFoods_viewer on Viewer
    @argumentDefinitions (
      sort: { type: "String" }
    ) {
      foods(sort: $sort) {
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
`;