import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, createRefetchContainer } from 'react-relay';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

class SelectExerciseModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    viewer: PropTypes.shape({
      exercises: PropTypes.shape({
        edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: PropTypes.shape({
              id: PropTypes.string.isRequired,
              name: PropTypes.string,
              avatarUrl: PropTypes.string,
            }).isRequired,
          })
        ).isRequired,
      }).isRequired,
    }).isRequired,
    relay: PropTypes.shape({
      refetch: PropTypes.func.isRequired,
    }).isRequired,
    onSelectExercise: PropTypes.func,
    onRequestClose: PropTypes.func,
  };

  static defaultProps = {
    title: 'Select Exercise',
    open: false,
    onSelectExercise: () => {},
    onRequestClose: () => {},
  };

  filterExercises = (e, filterByName) => {
    this.props.relay.refetch(
      { name: filterByName },
      null,
      () => {}
    );
  }

  render() {
    const { exercises } = this.props.viewer;

    return (
      <Dialog
        title={this.props.title}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
      >
        <TextField
          fullWidth
          onChange={this.filterExercises}
          hintText="Filter exercise list"
        />

        <List>
          {
            exercises.edges.map((edge) => (
              <ListItem
                key={edge.node.id}
                leftAvatar={<Avatar src={edge.node.avatarUrl} />}
                primaryText={edge.node.name}
                onClick={() => this.props.onSelectExercise(edge)}
              />
            ))
          }
        </List>
      </Dialog>
    );
  }
}

export default createRefetchContainer(
  SelectExerciseModal,
  {
    viewer: graphql`
      fragment SelectExerciseModal_viewer on Viewer
      @argumentDefinitions (
        name: { type: "String" }
      ) {
        exercises (
          name: $name
        ) {
          edges {
            node {
              id
              name
              avatarUrl
            }
          }
        }
      }
    `,
  },
  graphql`
    query SelectExerciseModalRefetchQuery (
      $name: String,
    ) {
      viewer {
        ...SelectExerciseModal_viewer
        @arguments(
          name: $name
        )
      }
    }
  `
);