
import React from 'react';
import PropTypes from 'prop-types';

import BackgroundSpinner from '../components/framework/BackgroundSpinner';

export default function (ComposedComponent) {
  const WithLoading = ({ isLoading, ...props }) => [
    <BackgroundSpinner key="loading" isShowing={isLoading} />,
    <ComposedComponent key="component" {...props} />,
  ];

  WithLoading.propTypes = {
    isLoading: PropTypes.bool,
  };

  WithLoading.defaultProps = {
    isLoading: false,
  };

  return WithLoading;
}
