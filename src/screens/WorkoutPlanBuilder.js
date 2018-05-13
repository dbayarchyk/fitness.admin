import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, QueryRenderer } from 'react-relay';

import Environment from '../Environment';

import BackgroundSpinner from '../components/framework/BackgroundSpinner';
import ErrorMessage from '../components/framework/ErrorMessage';

import WorkoutPlanBuilderView from '../components/WorkoutPlanBuilder';

const WorkoutPlanBuilderQuery = graphql`
  query WorkoutPlanBuilderQuery($workoutPlanId: ID!, $skipFetchWorkoutPlan: Boolean!) {
    viewer {
      ...WorkoutPlanBuilder_viewer
      @arguments(workoutPlanId: $workoutPlanId, skipFetchWorkoutPlan: $skipFetchWorkoutPlan)
    }
  }
`;

class WorkoutPlanBuilder extends Component {
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
        query={WorkoutPlanBuilderQuery}
        variables={{
          workoutPlanId: id || '',
          skipFetchWorkoutPlan: !id,
        }}
        render={({ error, props }) => {
          if (error && !error.errors) {
            return <ErrorMessage {...error} />;
          } if (error && error.errors.length) {
            return error.errors.map(err => <ErrorMessage {...err} />)
          } else if (props) {
            if (!props.viewer) {
              return <div>WorkoutPlan not found.</div>;
            }

            return (
              <WorkoutPlanBuilderView viewer={props.viewer} />
            );
          }
    
          return <BackgroundSpinner isShowing />;
        }}
      />
    );
  }
}

export default WorkoutPlanBuilder;
