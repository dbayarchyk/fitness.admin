import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, QueryRenderer } from 'react-relay';

import Environment from '../Environment';

import BackgroundSpinner from '../components/framework/BackgroundSpinner';

import ExerciseBuilderView from '../components/ExerciseBuilder';

const ExerciseBuilderQuery = graphql`
  query ExerciseBuilderQuery($exerciseId: ID!, $skipFetchExercise: Boolean!) {
    viewer {
      ...ExerciseBuilder_viewer
      @arguments(exerciseId: $exerciseId, skipFetchExercise: $skipFetchExercise)
    }
  }
`;

class ExerciseBuilder extends Component {
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
        query={ExerciseBuilderQuery}
        variables={{
          exerciseId: id || '',
          skipFetchExercise: !id,
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            if (!props.viewer) {
              return <div>Exercise not found.</div>;
            }

            return (
              <ExerciseBuilderView viewer={props.viewer} />
            );
          }
    
          return <BackgroundSpinner isShowing />;
        }}
      />
    );
  }
}

export default ExerciseBuilder;
