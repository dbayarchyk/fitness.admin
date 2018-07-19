import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';

import './styles.css';

const BackgroundSpinner = ({ isShowing }) => isShowing && (
  <div className="background-spinner">
    <CircularProgress />
  </div>
);

BackgroundSpinner.propTypes = {
  isShowing: PropTypes.bool,
};

BackgroundSpinner.defaultProps = {
  isShowing: false,
};

export default BackgroundSpinner;
