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
  meals: {
    isValid: (meals) => {
      const groupedByWeekday = _.groupBy(
        meals.edges,
        ({ node: { date } }) => moment(date).weekday()
      );
      const isAllWeekCovered = _.keys(groupedByWeekday).length === 7;
      let atLeastOneFeedPerDay = true;

      _.forEach(_.keys(groupedByWeekday), (weekday) => {
        _.map(groupedByWeekday[weekday], (mealEdge) => {
          atLeastOneFeedPerDay = atLeastOneFeedPerDay && !!mealEdge.node.feeds.edges.length;
        });
      });

      return isAllWeekCovered && atLeastOneFeedPerDay;
    },
  },
};