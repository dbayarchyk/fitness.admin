import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import MealListItem from '../MealListItem';

const DailyMeals = ({
  date,
  meals,
  dateFormat,
  deleteMealByDate,
  addMealByDate,
  changeMealTimeByDate,
  onDeleteFeedByIndexAndMealDate,
  addFeedToMeal,
  updateFeedByIndexMealDate,
  ...listItemProps
}) => [
  <ListItem
    {...listItemProps}
    key="item"
    initiallyOpen
    primaryTogglesNestedList
    primaryText={moment(date).format(dateFormat)}
    nestedItems={[
      ...meals.map(meal => (
        <MealListItem
          key={meal.date}
          date={meal.date}
          feeds={meal.feeds}
          deleteMeal={() => deleteMealByDate(meal.date)}
          changeMealTime={() => changeMealTimeByDate(meal.date)}
          onDeleteFeedByIndex={feedIndex => onDeleteFeedByIndexAndMealDate(meal.date, feedIndex)}
          addFeed={() => addFeedToMeal(meal.date)}
          onUpdateFeedByIndex={(feed, feedIndex) => updateFeedByIndexMealDate(
            meal.date,
            feed,
            feedIndex,
          )}
        />
      )),
      <ListItem disabled key="add-meal-button">
        <RaisedButton
          label="Add Meal"
          fullWidth
          onClick={() => addMealByDate(date)}
        />
      </ListItem>,
    ]}
  />,
  <Divider key="divider" />,
];

DailyMeals.propTypes = {
  date: PropTypes.string.isRequired,
  meals: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.date,
      feeds: PropTypes.shape({
        edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: PropTypes.shape({
              food: PropTypes.shape({
                id: PropTypes.string.isRequired,
                avatarUrl: PropTypes.string,
                name: PropTypes.string,
              }),
              weight: PropTypes.number,
            }).isRequired,
          }),
        ),
      }),
    }),
  ),
  dateFormat: PropTypes.string,
  deleteMealByDate: PropTypes.func.isRequired,
  addMealByDate: PropTypes.func.isRequired,
  onDeleteFeedByIndexAndMealDate: PropTypes.func.isRequired,
  addFeedToMeal: PropTypes.func.isRequired,
  updateFeedByIndexMealDate: PropTypes.func.isRequired,
};

DailyMeals.defaultProps = {
  meals: [],
  dateFormat: 'dddd',
};

export default DailyMeals;
