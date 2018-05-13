import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

import CONFIG from './config';

const store = new Store(new RecordSource());

const network = Network.create((operation, variables) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem(CONFIG.AUTH_TOKEN);

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['authorization'] = `Bearer ${token}`;
    }

    fetch(CONFIG.API_URI, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    })
      .then(response => response.json())
      .then((res) => {
        if (res.errors) {
          reject(res);
        } else {
          resolve(res);
        }
      });
  });
});

const environment = new Environment({
  network,
  store,
});

export default environment;
