import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const ExerciseMuscleList = ({ muscles, onRemoveMuslceClick, onAddMuscleClick }) => (
  <List>
    {
      muscles.edges.map(({ node: muscle }) => (
        <ListItem
          key={muscle.id}
          primaryText={muscle.name}
          rightIconButton={onRemoveMuslceClick && (
            <IconButton tooltip="Remove Muslce" onClick={() => onRemoveMuslceClick(muscle.id)}>
              <ActionDelete />
            </IconButton>
          )}
        />
      ))
    }

    {
      onAddMuscleClick && (
        <RaisedButton
          label="Add Muscle"
          primary
          fullWidth
          onClick={onAddMuscleClick}
        />
      )
    }
  </List>
);

ExerciseMuscleList.propTypes = {
  muscles: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
      }),
    ).isRequired,
  }),
  onAddMuscleClick: PropTypes.func,
  onRemoveMuslceClick: PropTypes.func,
};

ExerciseMuscleList.defaultProps = {
  muscles: {
    edges: [],
  },
  onAddMuscleClick: null,
  onRemoveMuslceClick: null,
};

export default ExerciseMuscleList;
