import React from 'react';
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
    render={({ props: { viewer } }) => <WorkoutPlanBuilderPresetView viewer={viewer} />}
  />
);

export default WorkoutPlanBuilderPresetContainer;
