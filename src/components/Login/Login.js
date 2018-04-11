import React from 'react';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm';

const Login = ({
  email,
  password,
  onFieldChange,
  onSignUpClick,
  onSignInClick,
  isSignInButtonDisabled,
}) => (
  <div>
    <h3>
      Welcome to Fitness Admin Console
    </h3>
  
    <LoginForm
      email={email}
      password={password}
      onFieldChange={onFieldChange}
      onSignUpClick={onSignUpClick}
      onSignInClick={onSignInClick}
      isSignInButtonDisabled={isSignInButtonDisabled}
    />
  </div>
);

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onFieldChange: PropTypes.func,
  onSignUpClick: PropTypes.func,
  onSignInClick: PropTypes.func,
  isSignInButtonDisabled: PropTypes.bool,
};

Login.defaultProps = {
  email: '',
  password: '',
  onFieldChange: () => {},
  onSignUpClick: () => {},
  onSignInClick: () => {},
  isSignInButtonDisabled: false,
};

export default Login;
