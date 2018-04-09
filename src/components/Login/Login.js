import React from 'react';
import PropTypes from 'prop-types';

// import LoginForm from './LoginForm';

const Login = ({
  email,
  password,
  onFieldChange,
  onSignUpClick,
  onSignInClick,
  isSignInButtonDisabled,
}) => (
  <div>
    <h1>
      Welcome to Fitness Admin Console
    </h1>
  
    {/* <LoginForm
      email={email}
      password={password}
      onFieldChange={onFieldChange}
    />

    <View style={styles.buttons}>
      <Button
        block
        onPress={onSignInClick}
        style={styles.button}
        disabled={isSignInButtonDisabled}
      >
        <Text>Log In</Text>
      </Button>

      <Button
        success
        block
        onPress={onSignUpClick}
        style={styles.button}
      >
        <Text>Create Account</Text>
      </Button>
    </View> */}
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
