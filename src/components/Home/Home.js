import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import ExitToAppIcon from 'material-ui/svg-icons/action/exit-to-app';

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
    localStorage.removeItem('f-token');
    this.props.history.push('/signin');
  };

  render() {
    const { children } = this.props;
    
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
          open={this.state.isNavBarOpen}
          docked={false}
          onRequestChange={(isNavBarOpen) => this.setState({ isNavBarOpen })}
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
