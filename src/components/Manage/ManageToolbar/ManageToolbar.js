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
import FilterListIcon from 'material-ui/svg-icons/content/filter-list';
import MoreIcon from 'material-ui/svg-icons/navigation/more-vert';

import Search from '../../framework/Search'; 

const ManageToolbar = ({
  toolbarTitle,
  toolbarActions,
  showToolbarActions,
  sortColumns,
  getSortIconIfNeeded,
  searchHintText,
  isSearchAvailable,
  isAdvancedSearchAvailable,
  actionClickHandler,
  onCreateClick,
  onChangeSort,
  onSearchSubmit,
  searchValue,
}) => (
  <Toolbar>
    <ToolbarGroup>
      <ToolbarTitle style={{ minWidth: 250 }} text={toolbarTitle} />

      {
        isSearchAvailable && (
          <Search
            hintText={searchHintText}
            value={searchValue}
            onSubmit={onSearchSubmit}
          />
        )
      }

      {
        isAdvancedSearchAvailable && (
          <IconButton>
            <FilterListIcon />
          </IconButton>
        )
      }
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
        showToolbarActions && toolbarActions && toolbarActions.contextMenu && (
          <IconMenu
            iconButtonElement={(
              <IconButton tooltip="Context Menu">
                <MoreIcon />
              </IconButton>
            )}
            onChange={(event, action) => actionClickHandler(action)}
          >
            {
              toolbarActions.contextMenu.map(toolbarAction => (
                <MenuItem
                  key={toolbarAction.action}
                  value={toolbarAction.action}
                  primaryText={toolbarAction.title}
                  leftIcon={toolbarAction.icon}
                />
              ))
            }
          </IconMenu>
        )
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
    contextMenu: PropTypes.arrayOf(
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
  searchHintText: PropTypes.string,
  isSearchAvailable: PropTypes.bool,
  isAdvancedSearchAvailable: PropTypes.bool,
  getSortIconIfNeeded: PropTypes.func.isRequired,
  actionClickHandler: PropTypes.func.isRequired,
  onCreateClick: PropTypes.func.isRequired,
  onChangeSort: PropTypes.func.isRequired,
  onSearchSubmit: PropTypes.func,
  searchValue: PropTypes.string,
};

ManageToolbar.defaultProps = {
  toolbarTitle: null,
  toolbarActions: null,
  sort: {
    name: null,
    direction: 'asc',
  },
  showToolbarActions: true,
  searchHintText: 'Search',
  isSearchAvailable: true,
  isAdvancedSearchAvailable: false,
  onSearchSubmit: null,
  searchValue: null,
};

export default ManageToolbar;
