import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import './index.css';
import reducers from './reducers';
import { browserHistory, Router } from 'react-router'
import routes from './routes';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
<Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
