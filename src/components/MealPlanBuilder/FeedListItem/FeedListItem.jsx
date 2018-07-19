import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List'; import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit';

const FeedListItem = ({
  food,
  weight,
  onDeleteFeed,
  onUpdateFeed,
  ...listItemProps
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
        leftIcon={<EditIcon />}
        primaryText="Update this Feed"
        onClick={onUpdateFeed}
      />
      <MenuItem
        leftIcon={<DeleteIcon />}
        primaryText="Delete this Feed"
        onClick={onDeleteFeed}
      />
    </IconMenu>
  );

  return (
    <ListItem
      {...listItemProps}
      leftAvatar={<Avatar src={food.avatarUrl} />}
      primaryText={food.name}
      secondaryText={`${weight}g`}
      rightIconButton={rightIconMenu}
    />
  );
};

FeedListItem.propTypes = {
  food: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
  }),
  weight: PropTypes.number,
  onDeleteFeed: PropTypes.func.isRequired,
  onUpdateFeed: PropTypes.func.isRequired,
};

FeedListItem.defaultProps = {
  food: {
    avatarUrl: '',
    name: '',
  },
  weight: 0,
};

export default FeedListItem;
