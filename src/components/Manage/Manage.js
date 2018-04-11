import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
} from 'material-ui/Toolbar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Manage extends Component {
  static propTypes = {
    toolbarTitle: PropTypes.string,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        tooltip: PropTypes.string,
        filter: PropTypes.func,
      })
    ).isRequired,
    items: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.object.isRequired,
        })
      ).isRequired,
    }).isRequired,
  };

  static defaultProps = {
    toolbarTitle: 'Manage',
  };

  render() {
    const {
      toolbarTitle,
      columns,
      items,
    } = this.props;

    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild>
            <ToolbarTitle text={toolbarTitle} />
          </ToolbarGroup>
        </Toolbar>

        <Table>
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
                    {column.title}
                  </TableHeaderColumn>
                ))
              }
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox={false}
          >
            {
              items.edges.map(({ node: item }, index) => (
                <TableRow
                  key={index}
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
      </div>
    );
  }
}

export default Manage;
