import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App'
import NewsList from './news/newslist'
import AlertsList from './alerts/alertlist'
import AlertItem from './alerts/alertitem'
import AlertItemAdd from './alerts/alertitemadd'
import NewsItem from './news/newsitem'
import NewsItemAdd from './news/newsitemadd'
import DashBoard from './dashboard'
import DashBoardContainer from './dashboardcontainer'
import GoLives from './golives/golivelist'
import AuthService from './utils/authservice'
import Award from './awards/award'
import Login from './login/login'

const auth = new AuthService('iJs8Cf5YV9H3n9QvfV6RUfZTSy3rmHAE', 'jsparla.eu.auth0.com')

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

export default (
  <Route path='/' component={App} auth={auth} >
    <IndexRoute component={DashBoardContainer} auth={auth} />
    <Route path='/main/:id' component={DashBoard} />
    <Route path='alerts' component={AlertsList} />
    <Route path='award' component={Award} />
    <Route path='alerts/new' component={AlertItemAdd} />
    <Route path='alerts/:id' component={AlertItem} />
    <Route path='news' component={NewsList} />
    <Route path='news/new' component={NewsItemAdd} />
    <Route path='news/:id' component={NewsItem} />
    <Route path='golives' component={GoLives} />
    <Route path='login' component={Login} auth={auth} />
  </Route>

)
