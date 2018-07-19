import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, createRefetchContainer } from 'react-relay';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

class SelectWorkoutPlanTemplateModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    viewer: PropTypes.shape({
      workoutPlanTemplates: PropTypes.shape({
        edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: PropTypes.shape({
              id: PropTypes.string.isRequired,
              name: PropTypes.string,
              avatarUrl: PropTypes.string,
            }).isRequired,
          }),
        ).isRequired,
      }).isRequired,
    }).isRequired,
    relay: PropTypes.shape({
      refetch: PropTypes.func.isRequired,
    }).isRequired,
    onSelectWorkoutPlanTemplate: PropTypes.func,
    onRequestClose: PropTypes.func,
  };

  static defaultProps = {
    title: 'Select Workout Plan Template',
    open: false,
    onSelectWorkoutPlanTemplate: () => {},
    onRequestClose: () => {},
  };

  filterWorkoutPlanTemplates = (e, filterByName) => {
    const { relay } = this.props;

    relay.refetch(
      { name: filterByName },
      null,
      () => {},
    );
  }

  render() {
    const {
      viewer: {
        workoutPlanTemplates,
      },
      title,
      open,
      onRequestClose,
      onSelectWorkoutPlanTemplate,
    } = this.props;

    return (
      <Dialog
        title={title}
        open={open}
        onRequestClose={onRequestClose}
      >
        <TextField
          fullWidth
          onChange={this.filterWorkoutPlanTemplates}
          hintText="Filter workout plan template list"
        />

        <List>
          {
            workoutPlanTemplates.edges.map(edge => (
              <ListItem
                key={edge.node.id}
                leftAvatar={<Avatar src={edge.node.avatarUrl} />}
                primaryText={edge.node.name}
                onClick={() => onSelectWorkoutPlanTemplate(edge)}
              />
            ))
          }
        </List>
      </Dialog>
    );
  }
}

export default createRefetchContainer(
  SelectWorkoutPlanTemplateModal,
  {
    viewer: graphql`
      fragment SelectWorkoutPlanTemplateModal_viewer on Viewer
      @argumentDefinitions (
        name: { type: "String" }
      ) {
        workoutPlanTemplates (
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
    query SelectWorkoutPlanTemplateModalRefetchQuery (
      $name: String,
    ) {
      viewer {
        ...SelectWorkoutPlanTemplateModal_viewer
        @arguments(
          name: $name
        )
      }
    }
  `,
);
