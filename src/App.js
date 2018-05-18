import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router } from 'react-router-dom';

import authService from './services/auth.service';

import BackgroundSpinner from './components/framework/BackgroundSpinner';

import './assets/styles/index.css';

import Routes from './Routes';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  state = {
    isLoaded: false,
  };

  componentDidMount() {
    this.setState({ isLoaded: false });

    authService.authorize()
      .then(() => this.setState({ isLoaded: true }))
      .catch(() => this.setState({ isLoaded: true }));
  }

  render() {
    return (
      <MuiThemeProvider>
        {
          this.state.isLoaded
            ? (
              <Router>
                <Routes />
              </Router>
            )
            : <BackgroundSpinner isShowing />
        }
      </MuiThemeProvider>
    );
  }
}

export default App;
