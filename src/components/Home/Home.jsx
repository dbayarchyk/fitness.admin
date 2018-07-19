import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import ExitToAppIcon from 'material-ui/svg-icons/action/exit-to-app';

import authService from '../../services/auth.service';

import NavBar from '../framework/NavBar';

class Home extends Component {
  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    children: null,
  };

  state = {
    isNavBarOpen: false,
  };

  toggleNavBar = () => this.setState(prevState => ({ isNavBarOpen: !prevState.isNavBarOpen }));

  logOut = () => {
    const { history } = this.props;

    authService.logout();
    history.push('/signin');
  };

  render() {
    const { children } = this.props;
    const { isNavBarOpen } = this.state;

    return (
      <div>
        <AppBar
          title={<Link to="/">Fitness Admin</Link>}
          onLeftIconButtonClick={this.toggleNavBar}
          iconElementRight={(
            <FlatButton
              onClick={this.logOut}
              label="Log Out"
              icon={<ExitToAppIcon />}
            />
          )}
        />

        <div>
          {children}
        </div>

        <Drawer
          open={isNavBarOpen}
          docked={false}
          onRequestChange={isOpen => this.setState({ isNavBarOpen: isOpen })}
        >
          <AppBar
            title={<Link to="/">Fitness Admin</Link>}
            onLeftIconButtonClick={this.toggleNavBar}
          />

          <NavBar onNavItemClicked={this.toggleNavBar} />
        </Drawer>
      </div>
    );
  }
}

export default withRouter(Home);
