import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import WorkoutListItem from '../WorkoutListItem';

const DailyWorkouts = ({
  date,
  workouts,
  dateFormat,
  deleteWorkoutByDate,
  deleteAllWorkoutsByDate,
  addWorkoutByDate,
  changeWorkoutTimeByDate,
  onDeleteExerciseAproachByIndexAndWorkoutDate,
  addExerciseAproachToWorkout,
  updateExerciseAproachByIndexWorkoutDate,
  ...listItemProps
}) => [
  <ListItem
    {...listItemProps}
    key="item"
    initiallyOpen
    primaryTogglesNestedList
    primaryText={moment(date).format(dateFormat)}
    rightIconButton={(
      <IconButton tooltip="Delete Workout" onClick={() => deleteAllWorkoutsByDate(date)}>
        <DeleteIcon />
      </IconButton>
    )}
    nestedItems={[
      ...workouts.map(workout => (
        <WorkoutListItem
          key={workout.date}
          date={workout.date}
          exerciseAproaches={workout.exerciseAproaches}
          deleteWorkout={() => deleteWorkoutByDate(workout.date)}
          changeWorkoutTime={() => changeWorkoutTimeByDate(workout.date)}
          // eslint-disable-next-line max-len
          onDeleteExerciseAproachByIndex={feedIndex => onDeleteExerciseAproachByIndexAndWorkoutDate(
            workout.date,
            feedIndex,
          )}
          addExerciseAproach={() => addExerciseAproachToWorkout(workout.date)}
          // eslint-disable-next-line max-len
          onUpdateExerciseAproachByIndex={(exerciseAproach, feedIndex) => updateExerciseAproachByIndexWorkoutDate(
            workout.date,
            exerciseAproach,
            feedIndex,
          )}
        />
      )),
      <ListItem disabled key="add-workout-button">
        <RaisedButton
          label="Add Workout"
          fullWidth
          onClick={() => addWorkoutByDate(date)}
        />
      </ListItem>,
    ]}
  />,
  <Divider key="divider" />,
];

DailyWorkouts.propTypes = {
  date: PropTypes.string.isRequired,
  workouts: PropTypes.arrayOf(
    PropTypes.shape({
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
          }),
        ),
      }),
    }),
  ),
  dateFormat: PropTypes.string,
  deleteWorkoutByDate: PropTypes.func.isRequired,
  deleteAllWorkoutsByDate: PropTypes.func.isRequired,
  addWorkoutByDate: PropTypes.func.isRequired,
  onDeleteExerciseAproachByIndexAndWorkoutDate: PropTypes.func.isRequired,
  addExerciseAproachToWorkout: PropTypes.func.isRequired,
  updateExerciseAproachByIndexWorkoutDate: PropTypes.func.isRequired,
};

DailyWorkouts.defaultProps = {
  workouts: [],
  dateFormat: 'dddd',
};

export default DailyWorkouts;
