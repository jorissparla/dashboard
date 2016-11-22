import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import NewsList from './news/newslist';
import AlertsList from './alerts/alertlist';
import AlertItem from './alerts/alertitem';
import NewsItem from './news/newsitem';
import NewsItemAdd from './news/newsitemadd';
import DashBoard from './dashboard'



export default (
  <Route path="/" component={App}>
    <IndexRoute component={DashBoard} />
    <Route path="/main/:id" component={DashBoard} />
     <Route path="alerts" component={AlertsList} />
        <Route path="alerts/:id" component={AlertItem} />
     <Route path="news" component={NewsList} />
          <Route path="news/new" component={NewsItemAdd} />
      <Route path="news/:id" component={NewsItem} />
 
  </Route>

);
