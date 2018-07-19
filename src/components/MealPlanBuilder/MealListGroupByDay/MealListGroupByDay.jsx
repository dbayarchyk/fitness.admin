import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import { List } from 'material-ui/List';

import DailyMeals from '../DailyMeals';

const groupMealsByDay = (meals = []) => groupBy(
  meals,
  ({ date }) => moment(date).startOf('day'),
);

const MealListGroupByDay = ({
  meals,
  deleteMealByDate,
  addMealByDate,
  changeMealTimeByDate,
  onDeleteFeedByIndexAndMealDate,
  addFeedToMeal,
  updateFeedByIndexMealDate,
}) => {
  const groupedMeals = groupMealsByDay(meals.edges.map(({ node }) => node));

  return (
    <List>
      {
        Object.keys(groupedMeals)
          .sort((date1, date2) => moment(date1).weekday() - moment(date2).weekday())
          .map(date => (
            <DailyMeals
              key={date}
              date={date}
              meals={groupedMeals[date]}
              deleteMealByDate={deleteMealByDate}
              addMealByDate={addMealByDate}
              changeMealTimeByDate={changeMealTimeByDate}
              onDeleteFeedByIndexAndMealDate={onDeleteFeedByIndexAndMealDate}
              addFeedToMeal={addFeedToMeal}
              updateFeedByIndexMealDate={updateFeedByIndexMealDate}
            />
          ))
      }
    </List>
  );
};

MealListGroupByDay.propTypes = {
  meals: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          date: PropTypes.string,
          feeds: PropTypes.shape({
            edges: PropTypes.arrayOf(
              PropTypes.shape({
                node: PropTypes.shape({
                  food: PropTypes.object.isRequired,
                  weight: PropTypes.number,
                }).isRequired,
              }),
            ),
          }).isRequired,
        }).isRequired,
      }).isRequired,
    ),
  }).isRequired,
  deleteMealByDate: PropTypes.func.isRequired,
  addMealByDate: PropTypes.func.isRequired,
  changeMealTimeByDate: PropTypes.func.isRequired,
  onDeleteFeedByIndexAndMealDate: PropTypes.func.isRequired,
  addFeedToMeal: PropTypes.func.isRequired,
  updateFeedByIndexMealDate: PropTypes.func.isRequired,
};

export default MealListGroupByDay;
