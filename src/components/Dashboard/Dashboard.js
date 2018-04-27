import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

const Dashboard = ({ viewer }) => (
  <div>
    Dashboard
  </div>
);

Dashboard.propTypes = {
  viewer: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default createFragmentContainer(
  Dashboard,
  graphql`
    fragment Dashboard_viewer on Viewer {
      role
    }
  `
);
