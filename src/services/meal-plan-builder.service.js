import _ from 'lodash';
import moment from 'moment';

class MealPlanBuilderService {
  filterOutMealByDate(meals, date) {
    return {
      ...meals,
      edges: _.filter(meals.edges, ({ node }) => node.date !== date),
    };
  }

  addMealByDate(meals, date) {
    const startDate = moment(date).startOf('day');
    const endDate = moment(date).startOf('day').add(1, 'd');
    
    date = moment(date);

    const { node: lastMealOfTheDay } = _.last(_.filter(meals.edges, ({ node: meal }) => moment(meal.date) >= startDate && moment(meal.date) < endDate));

    return {
      ...meals,
      edges: [
        ...meals.edges,
        {
          cursor: '',
          node: {
            date: moment(lastMealOfTheDay.date).add(2, 'hours').toString(),
            feeds: {
              edges: []
            },
          }
        },
      ],
    };
  }

  updateMealDateByOldDate(meals, date, newDate) {
    const editableIndex = _.findIndex(meals.edges, ({ node }) => node.date === date );

    return {
      ...meals,
      edges: [
        ...meals.edges.slice(0, editableIndex),
        {
          ...meals.edges[editableIndex],
          node: {
            ...meals.edges[editableIndex].node,
            date: newDate.toString(),
          },
        },
        ...meals.edges.slice(editableIndex + 1),
      ],
    };
  }

  filterOutFeedByIndexAndMealDate(meals, mealDate, feedIndex) {
    const editableMealIndex = _.findIndex(meals.edges, ({ node }) => node.date === mealDate );

    return {
      ...meals,
      edges: [
        ...meals.edges.slice(0, editableMealIndex),
        {
          ...meals.edges[editableMealIndex],
          node: {
            ...meals.edges[editableMealIndex].node,
            feeds: {
              ...meals.edges[editableMealIndex].feeds,
              edges: [
                ...meals.edges[editableMealIndex].node.feeds.edges.slice(0, feedIndex),
                ...meals.edges[editableMealIndex].node.feeds.edges.slice(feedIndex + 1),
              ],
            }
          },
        },
        ...meals.edges.slice(editableMealIndex + 1),
      ],
    };
  }

  addFeedToMealByDate(meals, mealDate, feed) {
    const editableMealIndex = _.findIndex(meals.edges, ({ node }) => node.date === mealDate );
    const newFeedEdge = {
      cursor: '',
      node: feed,
    };

    return {
      ...meals,
      edges: [
        ...meals.edges.slice(0, editableMealIndex),
        {
          ...meals.edges[editableMealIndex],
          node: {
            ...meals.edges[editableMealIndex].node,
            feeds: {
              ...meals.edges[editableMealIndex].feeds,
              edges: [
                ...meals.edges[editableMealIndex].node.feeds.edges,
                newFeedEdge,
              ],
            }
          },
        },
        ...meals.edges.slice(editableMealIndex + 1),
      ],
    };
  }

  updateFeedByIndexMealByDate(meals, mealDate, updatedFeed, feedIndex) {
    const editableMealIndex = _.findIndex(meals.edges, ({ node }) => node.date === mealDate );

    return {
      ...meals,
      edges: [
        ...meals.edges.slice(0, editableMealIndex),
        {
          ...meals.edges[editableMealIndex],
          node: {
            ...meals.edges[editableMealIndex].node,
            feeds: {
              ...meals.edges[editableMealIndex].feeds,
              edges: [
                ...meals.edges[editableMealIndex].node.feeds.edges.slice(0, feedIndex),
                {
                  ...meals.edges[editableMealIndex].node.feeds.edges[feedIndex],
                  node: updatedFeed,
                },
                ...meals.edges[editableMealIndex].node.feeds.edges.slice(feedIndex + 1),
              ],
            }
          },
        },
        ...meals.edges.slice(editableMealIndex + 1),
      ],
    };
  }

  addNextDayMeal(meals) {
    const lastDate = _.last((_.map(meals.edges, 'node.date')).sort((date1, date2) => new Date(date1) - new Date(date2)));
    const lastDateWeekDay = lastDate ? moment(lastDate).weekday() : moment().weekday(0);

    if (!this.isNewDayAvailable(meals)) {
      return {
        ...meals,
      };
    }

    return {
      ...meals,
      edges: [
        ...meals.edges,
        {
          cursor: '',
          node: {
            date: moment(lastDate).weekday(lastDate ? lastDateWeekDay + 1 : 0).hours(9).toString(),
            feeds: {
              edges: [],
            },
          }
        },
      ],
    };
  }

  isNewDayAvailable(meals) {
    return _.keys(_.groupBy(
      meals.edges,
      ({ node: { date } }) => moment(date).weekday()
    )).length < 7;
  }

  mapDataForRequest(innerData) {
    return {
      ...innerData,
      meals: innerData.meals.edges.map(({ node }) => ({
        ...node,
        feeds: node.feeds.edges.map(({ node }) => ({
          ...node,
          food: node.food.id,
        })),
      })),
    };
  }
}

export default new MealPlanBuilderService();
