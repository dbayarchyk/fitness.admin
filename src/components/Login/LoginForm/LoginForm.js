import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const LoginForm = ({
  email,
  password,
  onFieldChange,
  onSignUpClick,
  onSignInClick,
  isSignInButtonDisabled,
}) => (
  <form>
    <section>
      <TextField
        value={email}
        onChange={(e, email) => onFieldChange('email', email)}
        fullWidth
        hintText="Enter your email address"
        floatingLabelText="Email"
      />

      <TextField
        value={password}
        onChange={(e, password) => onFieldChange('password', password)}
        fullWidth
        hintText="Enter your password"
        floatingLabelText="Password"
        type="password"
      />
    </section>

    <footer>
      <RaisedButton label="Create Account" onClick={onSignUpClick} disabled />
      <RaisedButton label="Sign In" primary onClick={onSignInClick} disabled={isSignInButtonDisabled} />
    </footer>
  </form>
);

LoginForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onFieldChange: PropTypes.func,
  onSignUpClick: PropTypes.func,
  onSignInClick: PropTypes.func,
  isSignInButtonDisabled: PropTypes.bool,
};

LoginForm.defaultProps = {
  email: '',
  password: '',
  onFieldChange: () => {},
  onSignUpClick: () => {},
  onSignInClick: () => {},
  isSignInButtonDisabled: false,
};

export default LoginForm;