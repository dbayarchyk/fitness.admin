import React from 'react';
import PropTypes from 'prop-types';
import { QueryRenderer } from 'react-relay';

import Environment from '../../../Environment';

import BackgroundSpinner from '../BackgroundSpinner';
import ErrorMessage from '../ErrorMessage';

const QueryRendererContainer = ({
  environment,
  query,
  variables,
  render,
  onlyCustomRender,
}) => (
  <QueryRenderer
    environment={environment}
    query={query}
    variables={variables}
    render={({ error, props }) => {
      if (onlyCustomRender) {
        return render({ error, props });
      }

      if (error && !error.errors) {
        return <ErrorMessage {...error} />;
      }

      if (error && error.errors.length) {
        return error.errors.map(err => <ErrorMessage {...err} />);
      }

      if (props) {
        return render({ error, props });
      }

      return <BackgroundSpinner isShowing />;
    }}
  />
);

QueryRendererContainer.propTypes = {
  environment: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  query: PropTypes.func.isRequired,
  variables: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  render: PropTypes.func.isRequired,
  onlyCustomRender: PropTypes.bool,
};

QueryRendererContainer.defaultProps = {
  environment: Environment,
  variables: null,
  onlyCustomRender: false,
};

export default QueryRendererContainer;
