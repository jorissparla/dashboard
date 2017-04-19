import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App'
import NewsList from './news/newslist'
import AlertsList from './alerts/alertlist'
import AlertItem from './alerts/alertitem'
import ChatList from './chat/ChatList'
import ChatContainer from './chat/ChatContainer'

//import AlertItemAdd from './alerts/alertitemadd'
import AlertItemAddNew from './alerts/alertitemaddnew'
import NewsItem from './news/newsitem'
import NewsItemAdd from './news/newsitemadd'
import NewNews from './news/newnews'
import DashBoard from './dashboard'
import DashBoard0 from './dashboard0'
import DashBoardStats from './dashboardstats'
import DashBoardContainer from './dashboardcontainer'
import HistoryDayContainer from './charts/historydaycontainer'
import HistoryDayAll from './charts/historydayallcontainer'
import GoLiveList from './golives/golivelist'
import GoLiveList1 from './golives/golivelist1'
import GoLiveListSide from './golives/golivelistside'
import GoLives from './golives/golives'
import Award from './awards/award'
import Login from './login/login'
import KudoList1 from './kudos/kudolist1'
import KudoListComponent from './kudos/kudolistcomponent'
import KudoList from './kudos/kudolist'
import KudoListAll from './kudos/kudolistall'
import Signin from './auth/signin'
import Signout from './auth/signout'
import RequireAuth from './auth/require_auth'
import Test from './courses/card'
import Courses from './courses';
import CourseAddForm from './courses/addcourse';
import CourseEditForm from './courses/editcourse';

// validate authentication for private routes
/*const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}*/

export default (
  <Route path='/' component={App}  >
    <IndexRoute component={DashBoardContainer}  />

    <Route path='/main/1' component={DashBoard} />
    <Route path='/main/0' component={DashBoard0} />
    <Route path='/main/2' component={DashBoardStats} />
    <Route path='alerts' component={RequireAuth(AlertsList)} />
    <Route path='award' component={Award} />
    <Route path='test' component={Test} />
    <Route path='alerts/new' component={AlertItemAddNew} />
    <Route path='alerts/:id' component={AlertItem} />
    <Route path='news' component={RequireAuth(NewsList)} />
    <Route path='news/new' component={NewsItemAdd} />
    <Route path='chat' component={RequireAuth(ChatList)} />
    <Route path='chat/new' component={RequireAuth(ChatContainer)} />
    <Route path='news/new1' component={NewNews} />
    <Route path='news/:id' component={NewsItem} />
    <Route path='golivelist' component={GoLiveList} />
    <Route path='golivelist1' component={GoLiveList1} />
    <Route path='golivelistside' component={GoLiveListSide} />
    <Route path='golives' component={GoLives} />
    <Route path='kudos' component={KudoList} />
    <Route path='kudos1' component={KudoList1} />
    <Route path='kudosall' component={KudoListAll} />
    <Route path='kudolistcomponent' component={KudoListComponent} />
    <Route path='signin' component={Signin} />
    <Route path='login' component={Login}  />
    <Route path='signout' component={Signout}  />
    <Route path='historyday' component={HistoryDayContainer}  />
    <Route path='historyall' component={HistoryDayAll}  />
    <Route path='/courses' component={Courses} />    
    <Route path='/courses/:crs_UIC' component={CourseEditForm} />    
    <Route path='courses/new' component={CourseAddForm} />

  </Route>

)
