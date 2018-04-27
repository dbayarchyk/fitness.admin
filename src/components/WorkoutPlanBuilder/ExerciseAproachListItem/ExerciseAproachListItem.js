import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit';

const ExerciseAproachListItem = ({ exercise, count, onDeleteExerciseAproach, onUpdateExerciseAproach, ...listItemProps }) => {
  const iconButtonElement = (
    <IconButton
      touch
      tooltip="more"
      tooltipPosition="bottom-left"
    >
      <MoreVertIcon color={grey400} />
    </IconButton>
  );
  
  const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem
        leftIcon={<EditIcon />}
        primaryText="Update this Exercise Aproach"
        onClick={onUpdateExerciseAproach}
      />
      <MenuItem
        leftIcon={<DeleteIcon />}
        primaryText="Delete this Exercise Aproach"
        onClick={onDeleteExerciseAproach}
      />
    </IconMenu>
  );

  return (
    <ListItem
      {...listItemProps}
      leftAvatar={<Avatar src={exercise.avatarUrl} />}
      primaryText={exercise.name}
      secondaryText={count}
      rightIconButton={rightIconMenu}
    />
  );
};

ExerciseAproachListItem.propTypes = {
  exercise: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
  }),
  count: PropTypes.number,
  onDeleteExerciseAproach: PropTypes.func.isRequired,
  onUpdateExerciseAproach: PropTypes.func.isRequired,
};

ExerciseAproachListItem.defaultProps = {
  exercise: {
    avatarUrl: '',
    name: '',
  },
  count: 0,
};

export default ExerciseAproachListItem;
