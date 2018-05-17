import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, QueryRenderer } from 'react-relay';

import workoutPlanBuilderService from '../services/workout-plan-builder.service';

import Environment from '../Environment';

import BackgroundSpinner from '../components/framework/BackgroundSpinner';
import ErrorMessage from '../components/framework/ErrorMessage';

import WorkoutPlanBuilderView from '../components/WorkoutPlanBuilder';

const WorkoutPlanBuilderQuery = graphql`
  query WorkoutPlanBuilderQuery(
    $workoutPlanId: ID!,
    $workoutPlanTemplateId: ID!,
    $skipFetchWorkoutPlan: Boolean!,
    $skipFetchWorkoutPlanTemplate: Boolean!
  ) {
    viewer {
      ...WorkoutPlanBuilder_viewer
      @arguments(
        workoutPlanId: $workoutPlanId,
        workoutPlanTemplateId: $workoutPlanTemplateId,
        skipFetchWorkoutPlan: $skipFetchWorkoutPlan,
        skipFetchWorkoutPlanTemplate: $skipFetchWorkoutPlanTemplate,
      )
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
          workoutPlanTemplateId: workoutPlanBuilderService.templateId || '',
          skipFetchWorkoutPlan: !id,
          skipFetchWorkoutPlanTemplate: !workoutPlanBuilderService.templateId,
        }}
        render={({ error, props }) => {
          if (error && !error.errors) {
            return <ErrorMessage {...error} />;
          } if (error && error.errors.length) {
            return error.errors.map(err => <ErrorMessage {...err} />)
          } else if (props) {
            if (!props.viewer) {
              return <ErrorMessage message="WorkoutPlan not found" />;
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
