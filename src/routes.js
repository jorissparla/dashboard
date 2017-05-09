import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./App";

import AlertsList from "./alerts/alertlist";
import AlertItem from "./alerts/alertitem";
import ChatList from "./chat/ChatList";
import ChatContainer from "./chat/ChatContainer";
import AlertItemAddNew from "./alerts/alertitemaddnew";

import DashBoard from "./dashboard";
import DashBoard0 from "./dashboard0";
import DashBoardStats from "./dashboardstats";
import DashBoardContainer from "./dashboardcontainer";
import HistoryDayContainer from "./charts/historydaycontainer";
import HistoryDayAll from "./charts/historydayallcontainer";
import GoLiveList from "./golives/golivelist";
import GoLiveList1 from "./golives/golivelist1";
import GoLiveListSide from "./golives/golivelistside";
import GoLives from "./golives/golives";
import Award from "./awards/award";
import KudoList1 from "./kudos/kudolist1";
import KudoListComponent from "./kudos/kudolistcomponent";
import KudoList from "./kudos/kudolist";
import KudoListAll from "./kudos/kudolistall";
import Signin from "./auth/signin";
import Signout from "./auth/signout";
import RequireAuth from "./auth/require_auth";
import Courses from "./courses.old";
import CourseAddForm from "./courses.old/addcourse";
import CourseEditForm from "./courses.old/editcourse";

import NewsListContainer from "./news/newslistcontainer";
import NewsItemContainer from "./news/newsitemcontainer";
import NewsItemAddContainer from "./news/newsitemaddcontainer";

import SupportCards from "./graphql/SupportCards";
import SupportCardEdit from "./graphql/SupportCardEdit";
import CourseList from "./courses/CourseList";
import CourseCard from "./courses/CourseCard";
import StudentListContainer from "./courses/StudentListContainer";
import StudentView from "./courses/StudentView";
import AddStudentsToCourse from "./courses/AddStudentsToCourse";
// validate authentication for private routes
/*const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}*/

export default (
  <Route path="/" component={App}>
    <IndexRoute component={DashBoardContainer} />

    <Route path="/main/1" component={DashBoard} />
    <Route path="/main/0" component={DashBoard0} />
    <Route path="/main/2" component={DashBoardStats} />
    <Route path="alerts" component={RequireAuth(AlertsList)} />
    <Route path="award" component={Award} />
    <Route path="test" component={SupportCards} />
    <Route path="test/view/:id" component={SupportCardEdit} />
    <Route path="alerts/new" component={AlertItemAddNew} />
    <Route path="alerts/:id" component={AlertItem} />
    <Route path="/news" component={RequireAuth(NewsListContainer)} />
    <Route path="chat" component={RequireAuth(ChatList)} />
    <Route path="chat/new" component={RequireAuth(ChatContainer)} />
    <Route path="/news/add" component={NewsItemAddContainer} />
    <Route path="/news/edit/:id" component={NewsItemContainer} />
    <Route path="golivelist" component={GoLiveList} />
    <Route path="golivelist1" component={GoLiveList1} />
    <Route path="golivelistside" component={GoLiveListSide} />
    <Route path="golives" component={GoLives} />
    <Route path="kudos" component={KudoList} />
    <Route path="kudos1" component={KudoList1} />
    <Route path="kudosall" component={KudoListAll} />
    <Route path="kudolistcomponent" component={KudoListComponent} />
    <Route path="signin" component={Signin} />
    <Route path="signout" component={Signout} />
    <Route path="historyday" component={HistoryDayContainer} />
    <Route path="historyall" component={HistoryDayAll} />
    <Route path="/courseso" component={RequireAuth(Courses)} />
    <Route path="/courseso/edit/:crs_UIC" component={CourseEditForm} />
    <Route path="courseso/new" component={CourseAddForm} />
    <Route path="test/edit/:id" component={NewsItemContainer} />
    <Route path="test/new" component={NewsItemAddContainer} />
    <Route path="/courses" component={CourseList} />
    <Route path="/students" component={StudentListContainer} />
    <Route path="/students/:id" component={StudentView} />
    <Route path="/courses/edit/:id" component={CourseCard} />
    <Route path="/courses/addstudents/:id" component={AddStudentsToCourse} />
  </Route>
);
