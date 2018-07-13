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
        ({ node: { date } }) => moment(date).weekday(),
      );
      const atLeastOneWorkout = !!Object.keys(groupedByWeekday).length;
      let atLeastOneExerciseAproachPerDay = true;

      Object.keys(groupedByWeekday).forEach((weekday) => {
        groupedByWeekday[weekday].map(({ node }) => {
          atLeastOneExerciseAproachPerDay = atLeastOneExerciseAproachPerDay
                                            && !!node.exerciseAproaches.edges.length;
        });
      });

      return atLeastOneWorkout && atLeastOneExerciseAproachPerDay;
    },
  },
};
