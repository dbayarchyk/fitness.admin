import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import moment from 'moment';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import TimeIcon from 'material-ui/svg-icons/device/access-time';

import ExerciseAproachListItem from '../ExerciseAproachListItem';

const WorkoutListItem = ({
  date,
  exerciseAproaches,
  deleteWorkout,
  changeWorkoutTime,
  onDeleteExerciseAproachByIndex,
  addExerciseAproach,
  onUpdateExerciseAproachByIndex,
  ...listItemProps,
}) => {
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
        leftIcon={<TimeIcon />}
        primaryText="Change Workout Time"
        onClick={changeWorkoutTime}
      />
      <MenuItem
        leftIcon={<AddCircleIcon />}
        primaryText="Add Exercise Aproach"
        onClick={addExerciseAproach}
      />
      <MenuItem
        leftIcon={<DeleteIcon />}
        primaryText="Delete this Workout"
        onClick={deleteWorkout}
      />
    </IconMenu>
  );  

  return (
    <ListItem
      {...listItemProps}
      primaryText={moment(date).format('h:mma')}
      rightIconButton={rightIconMenu}
      initiallyOpen
      primaryTogglesNestedList
      nestedItems={
        exerciseAproaches.edges.map(({ node: exerciseAproach }, index) => (
          <ExerciseAproachListItem
            key={index}
            {...exerciseAproach}
            onDeleteExerciseAproach={() => onDeleteExerciseAproachByIndex(index)}
            onUpdateExerciseAproach={() => onUpdateExerciseAproachByIndex(exerciseAproach, index)}
          />
        ))
      }
    />
  );
};

WorkoutListItem.propTypes = {
  date: PropTypes.string,
  exerciseAproaches: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          exercise: PropTypes.shape({
            id: PropTypes.string.isRequired,
            avatarUrl: PropTypes.string,
            name: PropTypes.string,
          }),
          count: PropTypes.number,
        }).isRequired,
      })
    ),
  }),
  deleteWorkout: PropTypes.func.isRequired,
  changeWorkoutTime: PropTypes.func.isRequired,
  onDeleteExerciseAproachByIndex: PropTypes.func.isRequired,
  addExerciseAproach: PropTypes.func.isRequired,
  onUpdateExerciseAproachByIndex: PropTypes.func.isRequired,
};

WorkoutListItem.defaultProps = {
  date: null,
  exerciseAproaches: {
    edges: [],
  },
};

export default WorkoutListItem;
