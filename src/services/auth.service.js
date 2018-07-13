import { fetchQuery, graphql } from 'relay-runtime';

import Environment from '../Environment';
import CONFIG from '../config';

const viewerQuery = graphql`
  query authServiceQuery {
    viewer {
      role
    }
  }
`;

class Auth {
  viewer = null;

  authorize = () => new Promise((resolve, reject) => {
    fetchQuery(Environment, viewerQuery)
      .then(({ viewer }) => {
        this.viewer = viewer;
        resolve();
      })
      .catch(() => {
        this.viewer = null;
        reject();
      });
  });

  login = ({ token }) => {
    localStorage.setItem(CONFIG.AUTH_TOKEN, token);
  };

  logout = () => {
    localStorage.removeItem(CONFIG.AUTH_TOKEN);
  };
}

export default new Auth();
