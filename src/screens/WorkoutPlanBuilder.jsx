import React from 'react';
import { graphql } from 'react-relay';
import PropTypes from 'prop-types';

import QueryRenderer from '../components/framework/QueryRenderer';
import WorkoutPlanBuilderView from '../components/WorkoutPlanBuilder';
import workoutPlanBuilderService from '../services/workout-plan-builder.service';

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
    query={WorkoutPlanBuilderQuery}
    variables={{
      workoutPlanId: params.id || '',
      workoutPlanTemplateId: workoutPlanBuilderService.templateId || '',
      skipFetchWorkoutPlan: !params.id,
      skipFetchWorkoutPlanTemplate: !workoutPlanBuilderService.templateId,
    }}
    render={({ props: { viewer } }) => <WorkoutPlanBuilderView viewer={viewer} />}
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
