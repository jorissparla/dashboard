import React from 'react'
import { MatchRoutes } from 'react-router'

import App from './App'
import NewsList from './news/newslist'
import AlertsList from './alerts/alertlist'
import AlertItem from './alerts/alertitem'
import AlertItemAdd from './alerts/alertitemadd'
import NewsItem from './news/newsitem'
import NewsItemAdd from './news/newsitemadd'
import AuthService from './utils/authservice'

const auth = new AuthService('iJs8Cf5YV9H3n9QvfV6RUfZTSy3rmHAE', 'jsparla.eu.auth0.com')

// validate authentication for private Matchs
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

export default
  <MatchRoutes routes={[
    {
      pattern: '/',
      component: App
    },
    {
      pattern: 'alerts',
      component: AlertsList
    },
    {
      pattern: 'news',
      component: NewsList
    },
    {
      pattern: 'alerts/new',
      component: AlertItemAdd
    },
    {
      pattern: 'alerts/:id',
      component: AlertItem
    },
    {
      pattern: 'news/new',
      component: NewsItemAdd
    },
    {
      pattern: 'news/:id',
      component: NewsItem
    }
  ]} />

