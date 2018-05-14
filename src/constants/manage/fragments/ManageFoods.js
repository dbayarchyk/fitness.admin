import { graphql } from 'react-relay';

export default graphql`
  fragment ManageFoods_viewer on Viewer
    @argumentDefinitions (
      sort: { type: "String" },
      name: { type: "String" }
    ) {
      id
      foods(
        first: 2147483647,  # max GraphQLInt
        sort: $sort,
        name: $name
      )
      @connection(key: "ManageFoods_foods", filters: []) {
        edges {
          cursor
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