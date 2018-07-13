import groupBy from 'lodash/groupBy';
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
      const groupedByWeekday = groupBy(
        meals.edges,
        ({ node: { date } }) => moment(date).weekday(),
      );
      const isAllWeekCovered = Object.keys(groupedByWeekday).length === 7;
      let atLeastOneFeedPerDay = true;

      Object.keys(groupedByWeekday).forEach((weekday) => {
        groupedByWeekday[weekday].map((mealEdge) => {
          atLeastOneFeedPerDay = atLeastOneFeedPerDay && !!mealEdge.node.feeds.edges.length;
        });
      });

      return isAllWeekCovered && atLeastOneFeedPerDay;
    },
  },
};
