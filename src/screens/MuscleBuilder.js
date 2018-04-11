import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, QueryRenderer } from 'react-relay';

import Environment from '../Environment';

import BackgroundSpinner from '../components/framework/BackgroundSpinner';

import MuscleBuilderView from '../components/MuscleBuilder';

const MuscleBuilderQuery = graphql`
  query MuscleBuilderQuery($id: ID!) {
    viewer {
      node(id: $id) {
        id
        ... on Muscle {
          name
          group
        }
      }
    }
  }
`;

class MuscleBuilder extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
  };

  render() {
    const id = this.props.match.params.id;

    if (!id) {
      return (
        <MuscleBuilderView
        
        />
      );
    }

    return (
      <QueryRenderer
        environment={Environment}
        query={MuscleBuilderQuery}
        variables={{ id }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            if (!props.viewer.node) {
              return <div>Muscle not found.</div>;
            }

            return (
              <MuscleBuilderView
                node={props.viewer.node}
              />
            );
          }
    
          return <BackgroundSpinner isShowing />;
        }}
      />
    );
  }
}

export default MuscleBuilder;
