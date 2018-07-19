import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

const Dashboard = ({ viewer }) => (
  <div>
    <div>Dashboard</div>

    <div>Your role is {viewer.role}</div>
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
  `,
);
