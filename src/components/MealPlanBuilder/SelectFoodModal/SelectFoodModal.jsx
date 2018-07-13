import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, createRefetchContainer } from 'react-relay';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

class SelectFoodModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    viewer: PropTypes.shape({
      foods: PropTypes.shape({
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
    onSelectFood: PropTypes.func,
    onRequestClose: PropTypes.func,
  };

  static defaultProps = {
    title: 'Select Food',
    open: false,
    onSelectFood: () => {},
    onRequestClose: () => {},
  };

  filterFoods = (e, filterByName) => {
    const { relay } = this.props;

    relay.refetch(
      { name: filterByName },
      null,
      () => {},
    );
  }

  render() {
    const {
      viewer,
      title,
      open,
      onSelectFood,
      onRequestClose,
    } = this.props;
    const { foods } = viewer;

    return (
      <Dialog
        title={title}
        open={open}
        onRequestClose={onRequestClose}
      >
        <TextField
          fullWidth
          onChange={this.filterFoods}
          hintText="Filter food list"
        />

        <List>
          {
            foods.edges.map(edge => (
              <ListItem
                key={edge.node.id}
                leftAvatar={<Avatar src={edge.node.avatarUrl} />}
                primaryText={edge.node.name}
                onClick={() => onSelectFood(edge)}
              />
            ))
          }
        </List>
      </Dialog>
    );
  }
}

export default createRefetchContainer(
  SelectFoodModal,
  {
    viewer: graphql`
      fragment SelectFoodModal_viewer on Viewer
      @argumentDefinitions (
        name: { type: "String" }
      ) {
        foods (
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
    query SelectFoodModalRefetchQuery (
      $name: String,
    ) {
      viewer {
        ...SelectFoodModal_viewer
        @arguments(
          name: $name
        )
      }
    }
  `,
);
