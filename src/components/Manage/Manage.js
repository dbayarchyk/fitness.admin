import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import ArrowUpwardIcon from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDownwardIcon from 'material-ui/svg-icons/navigation/arrow-downward';

import ManageToolbar from './ManageToolbar';

const Manage = ({
  toolbarTitle,
  toolbarActions,
  columns,
  items,
  sort,
  selectedItemId,
  onChangeSort,
  actionClickHandler,
  onCreateClick,
  createButtonLabel,
  onItemClick,
  onSearchSubmit,
  searchValue,
}) => {
  const getSortIconIfNeeded = column => sort.name === column.name ? (sort.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />) : null;

  return (
    <div>
      <ManageToolbar
        toolbarTitle={toolbarTitle}
        toolbarActions={toolbarActions}
        showToolbarActions={!!selectedItemId}
        sortColumns={columns}
        getSortIconIfNeeded={getSortIconIfNeeded}
        actionClickHandler={actionClickHandler}
        onCreateClick={onCreateClick}
        createButtonLabel={createButtonLabel}
        onChangeSort={onChangeSort}
        onSearchSubmit={onSearchSubmit}
        searchValue={searchValue}
      />

      <Table
        onRowSelection={onItemClick}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            {
              columns.map(column => (
                <TableHeaderColumn
                  key={column.name}
                  tooltip={column.tooltip}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      cursor: column.sortDisabled ? 'default' : 'pointer',
                    }}
                    onClick={() => onChangeSort(column)}
                  >
                    {column.title}
                    {getSortIconIfNeeded(column)}
                  </span>
                </TableHeaderColumn>
              ))
            }
          </TableRow>
        </TableHeader>

        <TableBody
          showRowHover
          deselectOnClickaway={false}
          displayRowCheckbox={false}
        >
          {
            items.edges.map(({ node: item }, index) => (
              <TableRow
                key={index}
                selected={selectedItemId === item.id}
              >
                {
                  columns.map(column => (
                    <TableRowColumn
                      key={column.name}
                    >
                      {_.isFunction(column.filter) ? column.filter(_.get(item, column.name), item) :  _.get(item, column.name)}
                    </TableRowColumn>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      {
        !items.edges.length && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: 50,
          }}>
            Items are not found
          </div>
        )
      }
    </div>
  );
};

Manage.propTypes = {
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
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      tooltip: PropTypes.string,
      filter: PropTypes.func,
      sortDisabled: PropTypes.bool,
    })
  ).isRequired,
  items: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.object.isRequired,
      })
    ).isRequired,
  }).isRequired,
  sort: PropTypes.shape({
    name: PropTypes.string,
    direction: PropTypes.string,
  }),
  createButtonLabel: PropTypes.string,
  selectedItemId: PropTypes.string,
  onCreateClick: PropTypes.func.isRequired,
  onChangeSort: PropTypes.func.isRequired,
  onSearchSubmit: PropTypes.func,
  searchValue: PropTypes.string,
};

Manage.defaultProps = {
  toolbarTitle: 'Manage',
  toolbarActions: null,
  sort: {
    name: null,
    direction: 'asc',
  },
  createButtonLabel: null,
  selectedItemId: null,
  onSearchSubmit: null,
  searchValue: null,
};

export default Manage;
