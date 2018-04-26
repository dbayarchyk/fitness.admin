import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, QueryRenderer } from 'react-relay';

import Environment from '../Environment';

import BackgroundSpinner from '../components/framework/BackgroundSpinner';

import MealPlanBuilderView from '../components/MealPlanBuilder';

const MealPlanBuilderQuery = graphql`
  query MealPlanBuilderQuery($mealPlanId: ID!, $skipFetchMealPlan: Boolean!) {
    viewer {
      ...MealPlanBuilder_viewer
      @arguments(mealPlanId: $mealPlanId, skipFetchMealPlan: $skipFetchMealPlan)
    }
  }
`;

class MealPlanBuilder extends Component {
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
        query={MealPlanBuilderQuery}
        variables={{
          mealPlanId: id || '',
          skipFetchMealPlan: !id,
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            if (!props.viewer) {
              return <div>MealPlan not found.</div>;
            }

            return (
              <MealPlanBuilderView viewer={props.viewer} />
            );
          }
    
          return <BackgroundSpinner isShowing />;
        }}
      />
    );
  }
}

export default MealPlanBuilder;
