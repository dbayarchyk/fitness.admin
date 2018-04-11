import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';

const Home = ({ navItems, children }) => (
  <div>
    <AppBar
      title={<Link to="/">Fitness Admin</Link>}
    />

    <div>
      {children}
    </div>
  </div>
);

Home.propTypes = {
  children: PropTypes.node,
};

Home.defaultProps = {
  children: null,
};

export default Home;
