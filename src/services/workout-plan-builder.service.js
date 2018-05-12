import _ from 'lodash';
import moment from 'moment';

class WorkoutPlanBuilderService {
  filterOutWorkoutByDate(workouts, date) {
    return {
      ...workouts,
      edges: _.filter(workouts.edges, ({ node }) => node.date !== date),
    };
  }

  filterOutAllWorkoutsByDate(workouts, date) {
    const startDate = moment(date).startOf('day');
    const endDate = moment(date).startOf('day').add(1, 'd');
    
    date = moment(date);

    return {
      ...workouts,
      edges: _.filter(workouts.edges, ({ node: workout }) => !(moment(workout.date) >= startDate && moment(workout.date) < endDate)),
    };
  }

  addWorkoutByDate(workouts, date) {
    const startDate = moment(date).startOf('day');
    const endDate = moment(date).startOf('day').add(1, 'd');
    
    date = moment(date);

    const { node: lastWorkoutOfTheDay } = _.last(_.filter(workouts.edges, ({ node: workout }) => moment(workout.date) >= startDate && moment(workout.date) < endDate));

    return {
      ...workouts,
      edges: [
        ...workouts.edges,
        {
          cursor: '',
          node: {
            date: moment(lastWorkoutOfTheDay.date).add(2, 'hours').toString(),
            exerciseAproaches: {
              edges: []
            },
          }
        },
      ],
    };
  }

  updateWorkoutDateByOldDate(workouts, date, newDate) {
    const editableIndex = _.findIndex(workouts.edges, ({ node }) => node.date === date );

    return {
      ...workouts,
      edges: [
        ...workouts.edges.slice(0, editableIndex),
        {
          ...workouts.edges[editableIndex],
          node: {
            ...workouts.edges[editableIndex].node,
            date: newDate.toString(),
          },
        },
        ...workouts.edges.slice(editableIndex + 1),
      ],
    };
  }

  filterOutExerciseAproachByIndexAndWorkoutDate(workouts, workoutDate, exerciseAproachIndex) {
    const editableWorkoutIndex = _.findIndex(workouts.edges, ({ node }) => node.date === workoutDate );

    return {
      ...workouts,
      edges: [
        ...workouts.edges.slice(0, editableWorkoutIndex),
        {
          ...workouts.edges[editableWorkoutIndex],
          node: {
            ...workouts.edges[editableWorkoutIndex].node,
            exerciseAproaches: {
              ...workouts.edges[editableWorkoutIndex].exerciseAproaches,
              edges: [
                ...workouts.edges[editableWorkoutIndex].node.exerciseAproaches.edges.slice(0, exerciseAproachIndex),
                ...workouts.edges[editableWorkoutIndex].node.exerciseAproaches.edges.slice(exerciseAproachIndex + 1),
              ],
            }
          },
        },
        ...workouts.edges.slice(editableWorkoutIndex + 1),
      ],
    };
  }

  addExerciseAproachToWorkoutByDate(workouts, workoutDate, exerciseAproach) {
    const editableWorkoutIndex = _.findIndex(workouts.edges, ({ node }) => node.date === workoutDate );
    const newExerciseAproachEdge = {
      cursor: '',
      node: exerciseAproach,
    };

    return {
      ...workouts,
      edges: [
        ...workouts.edges.slice(0, editableWorkoutIndex),
        {
          ...workouts.edges[editableWorkoutIndex],
          node: {
            ...workouts.edges[editableWorkoutIndex].node,
            exerciseAproaches: {
              ...workouts.edges[editableWorkoutIndex].exerciseAproaches,
              edges: [
                ...workouts.edges[editableWorkoutIndex].node.exerciseAproaches.edges,
                newExerciseAproachEdge,
              ],
            }
          },
        },
        ...workouts.edges.slice(editableWorkoutIndex + 1),
      ],
    };
  }

  updateExerciseAproachByIndexWorkoutByDate(workouts, workoutDate, updatedExerciseAproach, exerciseAproachIndex) {
    const editableWorkoutIndex = _.findIndex(workouts.edges, ({ node }) => node.date === workoutDate );

    return {
      ...workouts,
      edges: [
        ...workouts.edges.slice(0, editableWorkoutIndex),
        {
          ...workouts.edges[editableWorkoutIndex],
          node: {
            ...workouts.edges[editableWorkoutIndex].node,
            exerciseAproaches: {
              ...workouts.edges[editableWorkoutIndex].exerciseAproaches,
              edges: [
                ...workouts.edges[editableWorkoutIndex].node.exerciseAproaches.edges.slice(0, exerciseAproachIndex),
                {
                  ...workouts.edges[editableWorkoutIndex].node.exerciseAproaches.edges[exerciseAproachIndex],
                  node: updatedExerciseAproach,
                },
                ...workouts.edges[editableWorkoutIndex].node.exerciseAproaches.edges.slice(exerciseAproachIndex + 1),
              ],
            }
          },
        },
        ...workouts.edges.slice(editableWorkoutIndex + 1),
      ],
    };
  }

  addNextDayWorkout(workouts) {
    const lastDate = _.last((_.map(workouts.edges, 'node.date')).sort((date1, date2) => new Date(date1) - new Date(date2)));
    const lastDateWeekDay = lastDate ? moment(lastDate).weekday() : moment().weekday(0);

    if (!this.isNewDayAvailable(workouts)) {
      return {
        ...workouts,
      };
    }

    return {
      ...workouts,
      edges: [
        ...workouts.edges,
        {
          cursor: '',
          node: {
            date: moment(lastDate).weekday(lastDate ? lastDateWeekDay + 1 : 0).hours(9).toString(),
            exerciseAproaches: {
              edges: [],
            },
          }
        },
      ],
    };
  }

  isNewDayAvailable(workouts) {
    return _.keys(_.groupBy(
      workouts.edges,
      ({ node: { date } }) => moment(date).weekday()
    )).length < 7;
  }

  mapDataForRequest(innerData) {
    return {
      ...innerData,
      workouts: innerData.workouts.edges.map(({ node }) => ({
        ...node,
        exerciseAproaches: node.exerciseAproaches.edges.map(({ node }) => ({
          ...node,
          exercise: node.exercise.id,
        })),
      })),
    };
  }
}

export default new WorkoutPlanBuilderService();
