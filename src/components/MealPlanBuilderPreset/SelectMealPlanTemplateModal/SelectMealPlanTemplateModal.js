import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, createRefetchContainer } from 'react-relay';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

class SelectMealPlanTemplateModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    viewer: PropTypes.shape({
      mealPlanTemplates: PropTypes.shape({
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
    onSelectMealPlanTemplate: PropTypes.func,
    onRequestClose: PropTypes.func,
  };

  static defaultProps = {
    title: 'Select Meal Plan Template',
    open: false,
    onSelectMealPlanTemplate: () => {},
    onRequestClose: () => {},
  };

  filterMealPlanTemplates = (e, filterByName) => {
    this.props.relay.refetch(
      { name: filterByName },
      null,
      () => {}
    );
  }

  render() {
    const { mealPlanTemplates } = this.props.viewer;

    return (
      <Dialog
        title={this.props.title}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
      >
        <TextField
          fullWidth
          onChange={this.filterMealPlanTemplates}
          hintText="Filter meal plan template list"
        />

        <List>
          {
            mealPlanTemplates.edges.map((edge) => (
              <ListItem
                key={edge.node.id}
                leftAvatar={<Avatar src={edge.node.avatarUrl} />}
                primaryText={edge.node.name}
                onClick={() => this.props.onSelectMealPlanTemplate(edge)}
              />
            ))
          }
        </List>
      </Dialog>
    );
  }
}

export default createRefetchContainer(
  SelectMealPlanTemplateModal,
  {
    viewer: graphql`
      fragment SelectMealPlanTemplateModal_viewer on Viewer
      @argumentDefinitions (
        name: { type: "String" }
      ) {
        mealPlanTemplates (
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
    query SelectMealPlanTemplateModalRefetchQuery (
      $name: String,
    ) {
      viewer {
        ...SelectMealPlanTemplateModal_viewer
        @arguments(
          name: $name
        )
      }
    }
  `
);