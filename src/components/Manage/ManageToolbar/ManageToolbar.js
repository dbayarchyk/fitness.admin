import React from 'react';
import PropTypes from 'prop-types';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
  ToolbarSeparator,
} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import SortIcon from 'material-ui/svg-icons/content/sort';

const ManageToolbar = ({
  toolbarTitle,
  toolbarActions,
  showToolbarActions,
  sortColumns,
  getSortIconIfNeeded,
  actionClickHandler,
  onCreateClick,
  onChangeSort,
}) => (
  <Toolbar>
    <ToolbarGroup>
      <ToolbarTitle text={toolbarTitle} />
    </ToolbarGroup>

    <ToolbarGroup>
      {
        showToolbarActions && toolbarActions && toolbarActions.left && toolbarActions.left.map(toolbarAction => (
          <IconButton
            key={toolbarAction.action}
            tooltip={toolbarAction.title}
            onClick={() => actionClickHandler(toolbarAction.action)}
          >
            {toolbarAction.icon}
          </IconButton>
        ))
      }

      {
        showToolbarActions && toolbarActions && toolbarActions.left && <ToolbarSeparator />
      }

      <RaisedButton
        primary
        label="Create New"
        onClick={onCreateClick}
      />

      <IconMenu
        iconButtonElement={(
          <RaisedButton
            label="Sort By"
            labelPosition="before"
            icon={<SortIcon />}
          />
        )}
        onChange={(event, column) => onChangeSort(column)}
      >
        {
          sortColumns.filter(column => !column.sortDisabled).map(column => (
            <MenuItem
              key={column.name}
              value={column}
              primaryText={column.title}
              rightIcon={getSortIconIfNeeded(column)}
            />
          ))
        }
      </IconMenu>
    </ToolbarGroup>
  </Toolbar>
);

ManageToolbar.propTypes = {
  toolbarTitle: PropTypes.string,
  toolbarActions: PropTypes.shape({
    left: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.node.isRequired,
        action: PropTypes.string.isRequired,
        title: PropTypes.string,
      })
    ),
  }),
  showToolbarActions: PropTypes.bool,
  sortColumns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      tooltip: PropTypes.string,
      filter: PropTypes.func,
      sortDisabled: PropTypes.bool,
    })
  ).isRequired,
  getSortIconIfNeeded: PropTypes.func.isRequired,
  actionClickHandler: PropTypes.func.isRequired,
  onCreateClick: PropTypes.func.isRequired,
  onChangeSort: PropTypes.func.isRequired,
};

ManageToolbar.defaltProps = {
  toolbarTitle: null,
  toolbarActions: null,
  sort: {
    name: null,
    direction: 'asc',
  },
  showToolbarActions: true,
};

export default ManageToolbar;
