import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { QueryRenderer } from 'react-relay';

import Environment from '../Environment';

import ManageService from '../services/manage.service';

import BackgroundSpinner from '../components/framework/BackgroundSpinner';

import ManageView from '../components/Manage';

class Manage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        category: PropTypes.string.isRequired,
      }),
    }).isRequired,
  };

  render() {
    const category = this.props.match.params.category;

    return (
      <QueryRenderer
        environment={Environment}
        query={ManageService.getQuery(category)}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return (
              <ManageView
                toolbarTitle={ManageService.getToolbarTitle(category)}
                columns={ManageService.getColumns(category)}
                items={ManageService.getItems(category, props.viewer)}
              />
            );
          }
    
          return <BackgroundSpinner isShowing />;
        }}
      />
    );
  }
}

export default Manage;
