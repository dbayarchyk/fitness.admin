import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const LoginForm = ({
  email,
  password,
  onFieldChange,
  onSignInClick,
  isSignInButtonDisabled,
}) => (
  <form>
    <section>
      <TextField
        value={email}
        name="email"
        onChange={onFieldChange}
        fullWidth
        hintText="Enter your email address"
        floatingLabelText="Email"
      />

      <TextField
        value={password}
        name="password"
        onChange={onFieldChange}
        fullWidth
        hintText="Enter your password"
        floatingLabelText="Password"
        type="password"
      />
    </section>

    <footer>
      <RaisedButton label="Sign In" primary onClick={onSignInClick} disabled={isSignInButtonDisabled} />
    </footer>
  </form>
);

LoginForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onFieldChange: PropTypes.func,
  onSignInClick: PropTypes.func,
  isSignInButtonDisabled: PropTypes.bool,
};

LoginForm.defaultProps = {
  email: '',
  password: '',
  onFieldChange: () => {},
  onSignInClick: () => {},
  isSignInButtonDisabled: false,
};

export default LoginForm;
