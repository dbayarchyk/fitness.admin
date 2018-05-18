import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';

import QueryRenderer from '../components/framework/QueryRenderer';
import MuscleBuilderView from '../components/MuscleBuilder';

const MuscleBuilderQuery = graphql`
  query MuscleBuilderQuery($muscleId: ID!, $skipFetchMuscle: Boolean!) {
    viewer {
      ...MuscleBuilder_viewer
      @arguments(muscleId: $muscleId, skipFetchMuscle: $skipFetchMuscle)
    }
  }
`;

const MuscleBuilderContainer = ({ match: { params } }) => (
  <QueryRenderer
    query={MuscleBuilderQuery}
    variables={{
      muscleId: params.id || '',
      skipFetchMuscle: !params.id,
    }}
    render={({ error, props }) => <MuscleBuilderView viewer={props.viewer} />}
  />
);

MuscleBuilderContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MuscleBuilderContainer;
