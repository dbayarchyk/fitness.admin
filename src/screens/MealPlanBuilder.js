import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';

import mealPlanBuilderService from '../services/meal-plan-builder.service';

import QueryRenderer from '../components/framework/QueryRenderer';
import MealPlanBuilderView from '../components/MealPlanBuilder';

const MealPlanBuilderQuery = graphql`
  query MealPlanBuilderQuery(
    $mealPlanId: ID!,
    $mealPlanTemplateId: ID!,
    $skipFetchMealPlan: Boolean!,
    $skipFetchMealPlanTemplate: Boolean!
  ) {
    viewer {
      ...MealPlanBuilder_viewer
      @arguments(
        mealPlanId: $mealPlanId,
        mealPlanTemplateId: $mealPlanTemplateId,
        skipFetchMealPlan: $skipFetchMealPlan,
        skipFetchMealPlanTemplate: $skipFetchMealPlanTemplate
      )
    }
  }
`;

const MealPlanBuilderContainer = ({ match: { params } }) => (
  <QueryRenderer
    query={MealPlanBuilderQuery}
    variables={{
      mealPlanId: params.id || '',
      mealPlanTemplateId: mealPlanBuilderService.templateId || '',
      skipFetchMealPlan: !params.id,
      skipFetchMealPlanTemplate: !mealPlanBuilderService.templateId,
    }}
    render={({ props }) => <MealPlanBuilderView viewer={props.viewer} />}
  />
);

MealPlanBuilderContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MealPlanBuilderContainer;
