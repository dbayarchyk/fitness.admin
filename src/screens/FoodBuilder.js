import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, QueryRenderer } from 'react-relay';

import Environment from '../Environment';

import BackgroundSpinner from '../components/framework/BackgroundSpinner';

import FoodBuilderView from '../components/FoodBuilder';

const FoodBuilderQuery = graphql`
  query FoodBuilderQuery($foodId: ID!, $skipFetchFood: Boolean!) {
    viewer {
      ...FoodBuilder_viewer
      @arguments(foodId: $foodId, skipFetchFood: $skipFetchFood)
    }
  }
`;

class FoodBuilder extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
  };

  render() {
    const id = this.props.match.params.id;

    return (
      <QueryRenderer
        environment={Environment}
        query={FoodBuilderQuery}
        variables={{
          foodId: id || '',
          skipFetchFood: !id,
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            if (!props.viewer) {
              return <div>Food not found.</div>;
            }

            return (
              <FoodBuilderView viewer={props.viewer} />
            );
          }
    
          return <BackgroundSpinner isShowing />;
        }}
      />
    );
  }
}

export default FoodBuilder;
