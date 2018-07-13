import React from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import { red500 } from 'material-ui/styles/colors';

import './styles.css';

export const ErrorMessage = ({ message }) => (
  <div className="error">
    <ErrorIcon color={red500} />
    <h2 className="error__message">{message}</h2>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

ErrorMessage.defaultProps = {
  message: 'Oops, something went wrong!',
};

export default ErrorMessage;
