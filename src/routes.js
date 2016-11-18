import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import NewsList from './newslist';
import NewsItem from './newsitem';
import DashBoard from './dashboard'



export default (
  <Route path="/" component={App}>
    <IndexRoute component={DashBoard} />
     <Route path="news" component={NewsList} />
      <Route path="news/:id" component={NewsItem} />
  </Route>

);
