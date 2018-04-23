import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';

class ExerciseMuscleList extends Component {
  static propTypes = {
    muscles: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,  
          }).isRequired,
        })
      ).isRequired,
    }),
    onAddMuscleClick: PropTypes.func,
    onRemoveMuslceClick: PropTypes.func,
  }

  static defaultProps = {
    muscles: {
      edges: [],
    },
  };

  render() {
    const { muscles } = this.props;

    return (
      <List>
        {
          muscles.edges.map(({ node }) => (
            <ListItem
              key={node.id}
              primaryText={node.name}
              rightIconButton={this.props.onRemoveMuslceClick && (
                <IconButton tooltip="Remove Muslce" onClick={() => this.props.onRemoveMuslceClick(node.id)}>
                  <ActionDelete />
                </IconButton>
              )}
            />
          ))
        }

        <RaisedButton
          label="Add Muscle"
          primary
          fullWidth
          onClick={this.props.onAddMuscleClick}
        />
      </List>
    );
  }
}

export default ExerciseMuscleList;
