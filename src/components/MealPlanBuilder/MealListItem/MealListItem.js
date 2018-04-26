import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import moment from 'moment';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import TimeIcon from 'material-ui/svg-icons/device/access-time';

import FeedListItem from '../FeedListItem';

const MealListItem = ({
  date,
  feeds,
  deleteMeal,
  changeMealTime,
  onDeleteFeedByIndex,
  addFeed,
  onUpdateFeedByIndex,
  ...listItemProps,
}) => {
  const iconButtonElement = (
    <IconButton
      touch
      tooltip="more"
      tooltipPosition="bottom-left"
    >
      <MoreVertIcon color={grey400} />
    </IconButton>
  );
  
  const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem
        leftIcon={<TimeIcon />}
        primaryText="Change Meal Time"
        onClick={changeMealTime}
      />
      <MenuItem
        leftIcon={<AddCircleIcon />}
        primaryText="Add Feed"
        onClick={addFeed}
      />
      <MenuItem
        leftIcon={<DeleteIcon />}
        primaryText="Delete this Meal"
        onClick={deleteMeal}
      />
    </IconMenu>
  );  

  return (
    <ListItem
      {...listItemProps}
      primaryText={moment(date).format('h:mma')}
      rightIconButton={rightIconMenu}
      initiallyOpen
      primaryTogglesNestedList
      nestedItems={
        feeds.edges.map(({ node: feed }, index) => (
          <FeedListItem
            key={index}
            {...feed}
            onDeleteFeed={() => onDeleteFeedByIndex(index)}
            onUpdateFeed={() => onUpdateFeedByIndex(feed, index)}
          />
        ))
      }
    />
  );
};

MealListItem.propTypes = {
  date: PropTypes.string,
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
      })
    ),
  }),
  deleteMeal: PropTypes.func.isRequired,
  changeMealTime: PropTypes.func.isRequired,
  onDeleteFeedByIndex: PropTypes.func.isRequired,
  addFeed: PropTypes.func.isRequired,
  onUpdateFeedByIndex: PropTypes.func.isRequired,
};

MealListItem.defaultProps = {
  date: null,
  feeds: {
    edges: [],
  },
};

export default MealListItem;
