import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, createRefetchContainer } from 'react-relay';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';

class SelectMuscleModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    viewer: PropTypes.shape({
      muscles: PropTypes.shape({
        edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: PropTypes.object.isRequired,
          })
        ).isRequired,
      }).isRequired,
    }).isRequired,
    onSelectMuslce: PropTypes.func,
    onRequestClose: PropTypes.func,
    refetch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: 'Select Muscle',
    open: false,
    onSelectMuslce: () => {},
    onRequestClose: () => {},
  };

  filterMuscles = (e, filterByName) => {
    this.props.relay.refetch(
      { name: filterByName },
      null,
      () => {}
    );
  }

  render() {
    const { muscles } = this.props.viewer;

    return (
      <Dialog
        title={this.props.title}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
      >
        <TextField
          fullWidth
          onChange={this.filterMuscles}
          hintText="Filter muscle list"
        />

        <List>
          {
            muscles.edges.map((edge) => (
              <ListItem
                key={edge.node.id}
                primaryText={edge.node.name}
                onClick={() => this.props.onSelectMuslce(edge)}
              />
            ))
          }
        </List>
      </Dialog>
    );
  }
}

export default createRefetchContainer(
  SelectMuscleModal,
  {
    viewer: graphql`
      fragment SelectMuscleModal_viewer on Viewer
      @argumentDefinitions (
        name: { type: "String" }
      ) {
        muscles (
          name: $name
        ) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
  },
  graphql`
    query SelectMuscleModalRefetchQuery (
      $name: String,
    ) {
      viewer {
        ...SelectMuscleModal_viewer
        @arguments(
          name: $name
        )
      }
    }
  `
);