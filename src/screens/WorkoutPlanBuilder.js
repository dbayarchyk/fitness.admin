import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';

import workoutPlanBuilderService from '../services/workout-plan-builder.service';

import QueryRenderer from '../components/framework/QueryRenderer';
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

const WorkoutPlanBuilderContainer = ({ match: { params } }) => (
  <QueryRenderer
    query={workoutPlanBuilderQuery}
    variables={{
      workoutPlanId: params.id || '',
      workoutPlanTemplateId: workoutPlanBuilderService.templateId || '',
      skipFetchworkoutPlan: !params.id,
      skipFetchworkoutPlanTemplate: !workoutPlanBuilderService.templateId,
    }}
    render={({ props }) => <WorkoutPlanBuilderView viewer={props.viewer} />}
  />
);

WorkoutPlanBuilderContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default WorkoutPlanBuilderContainer;
