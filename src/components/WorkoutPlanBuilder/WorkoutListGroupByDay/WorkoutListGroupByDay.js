import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import { List } from 'material-ui/List';

import DailyWorkouts from '../DailyWorkouts';

const groupWorkoutsByDay = (workouts = []) => _.groupBy(
  workouts,
  ({ date }) => moment(date).startOf('day')
);


const WorkoutListGroupByDay = ({
  workouts,
  deleteWorkoutByDate,
  deleteAllWorkoutsByDate,
  addWorkoutByDate,
  changeWorkoutTimeByDate,
  onDeleteExerciseAproachByIndexAndWorkoutDate,
  addExerciseAproachToWorkout,
  updateExerciseAproachByIndexWorkoutDate,
}) => {
  const groupedWorkouts = groupWorkoutsByDay(workouts.edges.map(({ node }) => node));

  return (
    <List>
      {
        Object.keys(groupedWorkouts)
        .sort((date1, date2) => moment(date1).weekday() - moment(date2).weekday())
        .map(date => (
          <DailyWorkouts
            key={date}
            date={date}
            workouts={groupedWorkouts[date]}
            deleteWorkoutByDate={deleteWorkoutByDate}
            deleteAllWorkoutsByDate={deleteAllWorkoutsByDate}
            addWorkoutByDate={addWorkoutByDate}
            changeWorkoutTimeByDate={changeWorkoutTimeByDate}
            onDeleteExerciseAproachByIndexAndWorkoutDate={onDeleteExerciseAproachByIndexAndWorkoutDate}
            addExerciseAproachToWorkout={addExerciseAproachToWorkout}
            updateExerciseAproachByIndexWorkoutDate={updateExerciseAproachByIndexWorkoutDate}
          />
        ))
      }
    </List>
  );
};

WorkoutListGroupByDay.propTypes = {
  workouts: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          date: PropTypes.string,
          exerciseAproaches: PropTypes.shape({
            edges: PropTypes.arrayOf(
              PropTypes.shape({
                node: PropTypes.shape({
                  exercise: PropTypes.object.isRequired,
                  count: PropTypes.number,
                }).isRequired,
              })
            )
          }).isRequired,
        }).isRequired
      }).isRequired,
    ),
  }).isRequired,
  deleteWorkoutByDate: PropTypes.func.isRequired,
  deleteAllWorkoutsByDate: PropTypes.func.isRequired,
  addWorkoutByDate: PropTypes.func.isRequired,
  changeWorkoutTimeByDate: PropTypes.func.isRequired,
  onDeleteExerciseAproachByIndexAndWorkoutDate: PropTypes.func.isRequired,
  addExerciseAproachToWorkout: PropTypes.func.isRequired,
  updateExerciseAproachByIndexWorkoutDate: PropTypes.func.isRequired,
};


export default WorkoutListGroupByDay;

