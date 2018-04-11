import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';

import CONFIG from '../config';
import BackgroundSpinner from '../components/framework/BackgroundSpinner';

export default function (ComposedComponent) {
  return class RestrictedRoute extends Component {
    static propTypes = {
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    };

    state = {
      hasToken: false,
      isLoaded: false,
    };
  
    componentDidMount() {
      const token = localStorage.getItem(CONFIG.AUTH_TOKEN);

      const hasToken = token !== null;
  
      this.setState({
        hasToken,
        isLoaded: true,
      });

      if (!hasToken) {
        this.props.history.push('/signin');
      }
    }
  
    render() {
      if (!this.state.isLoaded) {
        return <BackgroundSpinner isShowing />;
      }

      const RestirctedComponent = withRouter(ComposedComponent);
  
      return <RestirctedComponent />;
    }
  }
}
