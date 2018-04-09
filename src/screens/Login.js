import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CONFIG from '../config';
import { email as emailRegExp } from '../constants/regExp';
import checkValidation from '../helpers/checkValidation';
import withLoading from '../hoc/withLoading';

import LoginView from '../components/Login';

import LoginMutation from '../mutations/Login';

const LoginViewWithLoading = withLoading(LoginView);

class Login extends Component {
  static propsTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    email: '',
    password: '',

    isLoading: false,
  };

  onFieldChange = (name, value) => this.setState({ [name]: value });

  onSignUpClick = () => this.props.history.push('/signup');

  onSignInClick = () => {
    this.setState({ isLoading: true });

    LoginMutation(this.state.email, this.state.password)
      .then((response, errors) => {
        if (response.login) {
          localStorage.setItem(CONFIG.AUTH_TOKEN, response.login.token);
          alert('Welcome to the admin console!');
          this.props.history.push('/');
        } else {
          alert('Oops, something went wrong!');
        }

        this.setState({ isLoading: false });
      })
      .catch((errors) => {
        if (errors && errors.length) {
          errors.forEach(error => alert(error.message));
        } else {
          alert('Oops, something went wrong!');
        }
        this.setState({ isLoading: false });
      });
  };

  isDataValid = () => checkValidation(this.state, validationConfig);

  render() {
    return (
      <LoginViewWithLoading
        {...this.state}
        onFieldChange={this.onFieldChange}
        onSignUpClick={this.onSignUpClick}
        onSignInClick={this.onSignInClick}
        isSignInButtonDisabled={!this.isDataValid()}
      />
    );
  }
}

const validationConfig = {
  email: {
    isValid: value => emailRegExp.test(value),
  },
  password: {
    isValid: value => value && value.length,
  },
};

export default Login;
