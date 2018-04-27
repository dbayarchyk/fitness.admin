import _ from 'lodash';
import moment from 'moment';

import { url as urlRegExp } from '../../constants/regExp';

export default {
  name: {
    isValid: value => value && value.length,
  },
  avatarUrl: {
    isValid: value => urlRegExp.test(value) || !value,
  },
  workouts: {
    isValid: (workouts) => {
      const groupedByWeekday = _.groupBy(
        workouts.edges,
        ({ node: { date } }) => moment(date).weekday()
      );
      let atLeastOneWorkout = !!_.keys(groupedByWeekday).length;
      let atLeastOneExerciseAproachPerDay = true;

      _.forEach(_.keys(groupedByWeekday), (weekday) => {
        _.map(groupedByWeekday[weekday], (workoutEdge) => {
          atLeastOneExerciseAproachPerDay = atLeastOneExerciseAproachPerDay && !!workoutEdge.node.exerciseAproaches.edges.length;
        });
      });

      return atLeastOneWorkout && atLeastOneExerciseAproachPerDay;
    },
  },
};