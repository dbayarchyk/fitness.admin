import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    render={({ props }) => <MealPlanBuilderPresetView viewer={props.viewer} />}
  />
);

export default MealPlanBuilderPresetContainer;
