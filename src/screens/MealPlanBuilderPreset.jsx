import React from 'react';
import { graphql } from 'react-relay';

import QueryRenderer from '../components/framework/QueryRenderer';
import MealPlanBuilderPresetView from '../components/MealPlanBuilderPreset';

const MealPlanBuilderPresetQuery = graphql`
  query MealPlanBuilderPresetQuery {
    viewer {
      ...MealPlanBuilderPreset_viewer
    }
  }
`;

const MealPlanBuilderPresetContainer = () => (
  <QueryRenderer
    query={MealPlanBuilderPresetQuery}
    render={({ props: { viewer } }) => <MealPlanBuilderPresetView viewer={viewer} />}
  />
);

export default MealPlanBuilderPresetContainer;
