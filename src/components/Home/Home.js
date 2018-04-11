import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';

const Home = ({ navItems, children }) => (
  <div>
    <AppBar
      title="Fitness Admin"
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
