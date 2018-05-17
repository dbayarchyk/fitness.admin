import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, QueryRenderer } from 'react-relay';

import Environment from '../Environment';

import BackgroundSpinner from '../components/framework/BackgroundSpinner';
import ErrorMessage from '../components/framework/ErrorMessage';

import WorkoutPlanBuilderPresetView from '../components/WorkoutPlanBuilderPreset';

const WorkoutPlanBuilderPresetQuery = graphql`
  query WorkoutPlanBuilderPresetQuery {
    viewer {
      ...WorkoutPlanBuilderPreset_viewer
    }
  }
`;

class WorkoutPlanBuilderPreset extends Component {
  render() {
    return (
      <QueryRenderer
        environment={Environment}
        query={WorkoutPlanBuilderPresetQuery}
        render={({ error, props }) => {
          if (error && !error.errors) {
            return <ErrorMessage {...error} />;
          } if (error && error.errors.length) {
            return error.errors.map(err => <ErrorMessage {...err} />)
          } else if (props) {
            if (!props.viewer) {
              return <ErrorMessage message="Oops, something went wrong!" />;
            }

            return (
              <WorkoutPlanBuilderPresetView viewer={props.viewer} />
            );
          }
    
          return <BackgroundSpinner isShowing />;
        }}
      />
    );
  }
}

export default WorkoutPlanBuilderPreset;
