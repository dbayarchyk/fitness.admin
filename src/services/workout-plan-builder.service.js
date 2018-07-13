import last from 'lodash/last';
import groupBy from 'lodash/groupBy';
import moment from 'moment';

class WorkoutPlanBuilderService {
  isPresetStepComplitted = false;

  templateId = null;

  complitePresetStep(tempalteId) {
    this.templateId = tempalteId;
    this.isPresetStepComplitted = true;
  }

  resetPresetStep() {
    this.isPresetStepComplitted = false;
    this.templateId = null;
  }

  filterOutWorkoutByDate = (workouts, date) => ({
    ...workouts,
    edges: workouts.edges.filter(({ node }) => node.date !== date),
  })

  filterOutAllWorkoutsByDate = (workouts, date) => {
    const startDate = moment(date).startOf('day');
    const endDate = moment(date).startOf('day').add(1, 'd');

    return {
      ...workouts,
      edges: workouts.edges.filter(({ node: workout }) => !(moment(workout.date) >= startDate
                                                            && moment(workout.date) < endDate)),
    };
  }

  addWorkoutByDate = (workouts, date) => {
    const startDate = moment(date).startOf('day');
    const endDate = moment(date).startOf('day').add(1, 'd');

    const { node: lastWorkoutOfTheDay } = last(
      workouts.edges.filter(({ node: workout }) => moment(workout.date) >= startDate
                                                   && moment(workout.date) < endDate),
    );

    return {
      ...workouts,
      edges: [
        ...workouts.edges,
        {
          cursor: '',
          node: {
            date: moment(lastWorkoutOfTheDay.date).add(2, 'hours').toString(),
            exerciseAproaches: {
              edges: [],
            },
          },
        },
      ],
    };
  }

  updateWorkoutDateByOldDate = (workouts, date, newDate) => {
    const editableIndex = workouts.edges.findIndex(({ node }) => node.date === date);

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

  filterOutExerciseAproachByIndexAndWorkoutDate = (workouts, workoutDate, exerciseAproachIndex) => {
    const editableWorkoutIndex = workouts.edges.findIndex(({ node }) => node.date === workoutDate);

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
            },
          },
        },
        ...workouts.edges.slice(editableWorkoutIndex + 1),
      ],
    };
  }

  addExerciseAproachToWorkoutByDate = (workouts, workoutDate, exerciseAproach) => {
    const editableWorkoutIndex = workouts.edges.findIndex(({ node }) => node.date === workoutDate );
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
            },
          },
        },
        ...workouts.edges.slice(editableWorkoutIndex + 1),
      ],
    };
  }

  updateExerciseAproachByIndexWorkoutByDate = (
    workouts,
    workoutDate,
    updatedExerciseAproach,
    exerciseAproachIndex,
  ) => {
    const editableWorkoutIndex = workouts.edges.findIndex(({ node }) => node.date === workoutDate );

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
            },
          },
        },
        ...workouts.edges.slice(editableWorkoutIndex + 1),
      ],
    };
  }

  addNextDayWorkout(workouts) {
    const lastDate = last(
      workouts.edges.map(({ node }) => node.date)
        .sort((date1, date2) => new Date(date1) - new Date(date2)),
    );
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
          },
        },
      ],
    };
  }

  isNewDayAvailable = workouts => Object.keys(groupBy(
    workouts.edges,
    ({ node: { date } }) => moment(date).weekday(),
  )).length < 7;

  mapDataForRequest = innerData => ({
    ...innerData,
    workouts: innerData.workouts.edges.map(({ node: workoutNode }) => ({
      ...workoutNode,
      exerciseAproaches: workoutNode.exerciseAproaches.edges.map(({ node: exerciseAproacheNode }) => ({
        ...exerciseAproacheNode,
        exercise: exerciseAproacheNode.exercise.id,
      })),
    })),
  })
}

export default new WorkoutPlanBuilderService();
