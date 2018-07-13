import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';

import QueryRenderer from '../components/framework/QueryRenderer';
import ExerciseBuilderView from '../components/ExerciseBuilder';

const ExerciseBuilderQuery = graphql`
  query ExerciseBuilderQuery($exerciseId: ID!, $skipFetchExercise: Boolean!) {
    viewer {
      ...ExerciseBuilder_viewer
      @arguments(exerciseId: $exerciseId, skipFetchExercise: $skipFetchExercise)
    }
  }
`;

const ExerciseBuilderContainer = ({ match: { params } }) => (
  <QueryRenderer
    query={ExerciseBuilderQuery}
    variables={{
      exerciseId: params.id || '',
      skipFetchExercise: !params.id,
    }}
    render={({ props: { viewer } }) => <ExerciseBuilderView viewer={viewer} />}
  />
);

ExerciseBuilderContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ExerciseBuilderContainer;
