import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';

import authService from '../services/auth.service';

export default function (ComposedComponent) {
  return class RestrictedRoute extends Component {
    static propTypes = {
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    };

    componentDidMount() {
      if (!authService.viewer) {
        this.props.history.push('/signin');
      }
    }
  
    render() {
      const RestirctedComponent = withRouter(ComposedComponent);
  
      return <RestirctedComponent />;
    }
  }
}
