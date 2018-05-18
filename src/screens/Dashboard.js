import React from 'react';
import { graphql } from 'react-relay';

import QueryRenderer from '../components/framework/QueryRenderer';
import DashboardView from '../components/Dashboard';

const DashboardQuery = graphql`
  query DashboardQuery {
    viewer {
      ...Dashboard_viewer
    }
  }
`;

const DashboardContainer = () => (
  <QueryRenderer
    query={DashboardQuery}
    render={({ props }) => <DashboardView viewer={props.viewer} />}
  />
);

export default DashboardContainer;
