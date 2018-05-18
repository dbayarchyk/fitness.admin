import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';

import QueryRenderer from '../components/framework/QueryRenderer';
import FoodBuilderView from '../components/FoodBuilder';

const FoodBuilderQuery = graphql`
  query FoodBuilderQuery($foodId: ID!, $skipFetchFood: Boolean!) {
    viewer {
      ...FoodBuilder_viewer
      @arguments(foodId: $foodId, skipFetchFood: $skipFetchFood)
    }
  }
`;

const FoodBuilderContainer = ({ match: { params } }) => (
  <QueryRenderer
    query={FoodBuilderQuery}
    variables={{
      foodId: params.id || '',
      skipFetchFood: !params.id,
    }}
    render={({ props }) => <FoodBuilderView viewer={props.viewer} />}
  />
);

FoodBuilderContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodBuilderContainer;
