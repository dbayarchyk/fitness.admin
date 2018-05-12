import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

import NavBar from '../framework/NavBar';

class Home extends Component { 
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  state = {
    isNavBarOpen: false,
  };

  toggleNavBar = () => this.setState(prevState => ({ isNavBarOpen: !prevState.isNavBarOpen }));

  render() {
    const { children } = this.props;

    const header = (
      <AppBar
        title={<Link to="/">Fitness Admin</Link>}
        onLeftIconButtonClick={this.toggleNavBar}
      />
    );
    
    return (
      <div>
        {header}
        
        <div>
          {children}
        </div>

        <Drawer
          open={this.state.isNavBarOpen}
          docked={false}
          onRequestChange={(isNavBarOpen) => this.setState({ isNavBarOpen })}
        >
          {header}

          <NavBar onNavItemClicked={this.toggleNavBar} />
        </Drawer>
      </div>
    );
  }
}

export default Home;
