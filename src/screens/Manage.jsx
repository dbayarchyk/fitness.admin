import React from 'react';
import PropTypes from 'prop-types';

import manageRefetchContainer from '../hoc/manage-refetch-container';
import manageService from '../services/manage.service';

import QueryRenderer from '../components/framework/QueryRenderer';
import ManageView from '../components/Manage';

const ManageContainer = ({ match: { params: { category } } }) => {
  const defaultSort = manageService.getSortFromLocalStorage(category);

  return (
    <QueryRenderer
      query={manageService.getQuery(category)}
      variables={{
        sort: manageService.getSortValue(defaultSort),
      }}
      render={({ props: { viewer } }) => {
        const ManageRefetchContainer = manageRefetchContainer(ManageView, category);

        return (
          <ManageRefetchContainer
            category={category}
            viewer={viewer}
            defaultSort={defaultSort}
          />
        );
      }}
    />
  );
};

ManageContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ManageContainer;
