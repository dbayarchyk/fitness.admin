import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { QueryRenderer } from 'react-relay';

import Environment from '../Environment';

import manageRefetchContainer from '../hoc/manage-refetch-container';
import manageService from '../services/manage.service';

import BackgroundSpinner from '../components/framework/BackgroundSpinner';
import ErrorMessage from '../components/framework/ErrorMessage';

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
    const defaultSort = manageService.getSortFromLocalStorage(category);

    return (
      <QueryRenderer
        environment={Environment}
        query={manageService.getQuery(category)}
        variables={{
          sort: manageService.getSortValue(defaultSort),
        }}
        render={({ error, props }) => {      
          if (error && !error.errors) {
            return <ErrorMessage {...error} />;
          } if (error && error.errors.length) {
            return error.errors.map(err => <ErrorMessage {...err} />)
          } else if (props) {
            const ManageRefetchContainer = manageRefetchContainer(ManageView, category);

            return (
              <ManageRefetchContainer
                category={category}
                viewer={props.viewer}
                defaultSort={defaultSort}
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
