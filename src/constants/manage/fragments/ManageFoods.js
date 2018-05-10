import { graphql } from 'react-relay';

export default graphql`
  fragment ManageFoods_viewer on Viewer
    @argumentDefinitions (
      sort: { type: "String" },
      name: { type: "String" }
    ) {
      foods(sort: $sort, name: $name) {
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