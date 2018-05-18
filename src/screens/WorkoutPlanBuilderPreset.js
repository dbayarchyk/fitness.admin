import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';

import QueryRenderer from '../components/framework/QueryRenderer';
import WorkoutPlanBuilderPresetView from '../components/WorkoutPlanBuilderPreset';

const WorkoutPlanBuilderPresetQuery = graphql`
  query WorkoutPlanBuilderPresetQuery {
    viewer {
      ...WorkoutPlanBuilderPreset_viewer
    }
  }
`;

const WorkoutPlanBuilderPresetContainer = () => (
  <QueryRenderer
    query={WorkoutPlanBuilderPresetQuery}
    render={({ props }) => <WorkoutPlanBuilderPresetView viewer={props.viewer} />}
  />
);

export default WorkoutPlanBuilderPresetContainer;
