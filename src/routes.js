import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
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
import Forgot from "./auth/forgot";
import UpdatePassword from "./auth/resetpassword";
import RequireAuth, { AuthRoute } from "./auth/require_auth";
import ResetPasswordForm from "./auth/ResetPasswordForm";
import RequestResetPassword from "./auth/RequestResetPassword";

import NewsListContainer from "./news/newslistcontainer";
import NewsItemContainer from "./news/newsitemcontainer";
import NewsItemAddContainer from "./news/newsitemaddcontainer";

import SupportCards from "./supportcard/SupportCards";
import RequestForm from "./supportcard/Request";
import SupportCardEdit from "./supportcard/SupportCardEdit";
import SupportCardAdd from "./supportcard/SupportCardAdd";
import CourseList from "./courses/CourseList";
import CourseCard from "./courses/CourseCard";
import AddCourseCard from "./courses/AddCourseCard";
import StudentListContainer from "./courses/StudentListContainer";
import StudentView from "./courses/StudentView";
import AddStudentsToCourse from "./courses/AddStudentsToCourse";

const NotFound = () => <h2>Not Found!</h2>;

const AppRoutes = ({ user }) => (
  <Switch>
    <Route exact path="/" component={DashBoardContainer} />
    <Route path="/main/1" component={DashBoard} />
    <Route path="/main/0" component={DashBoard0} />
    <Route path="/main/2" component={DashBoardStats} />
    <Route exact path="/alerts" component={RequireAuth(AlertsList)} />
    <Route path="award" component={Award} />
    <Route
      auth="admin"
      user={user}
      exact
      path="/supportcard"
      component={SupportCards}
    />
    <Route path="/supportcard/edit/:id" component={SupportCardEdit} />
    <Route exact path="/supportcard/add" component={SupportCardAdd} />
    <Route exact path="/supportcard/request" component={RequestForm} />
    <Route exact path="/alerts/new" component={RequireAuth(AlertItemAddNew)} />
    <Route path="/alerts/:id" component={RequireAuth(AlertItem)} />
    <Route exact path="/news" component={NewsListContainer} />
    <Route
      exact
      path="/news/edit/:id"
      component={RequireAuth(NewsItemContainer)}
    />
    <Route
      exact
      path="/news/add"
      component={RequireAuth(NewsItemAddContainer)}
    />
    <Route exact path="/chat" component={RequireAuth(ChatList)} />
    <Route exact path="/chat/new" component={RequireAuth(ChatContainer)} />
    <Route
      exact
      path="/news/add"
      component={RequireAuth(NewsItemAddContainer)}
    />

    <Route path="/golivelist" component={GoLiveList} />
    <Route path="/golivelist1" component={GoLiveList1} />
    <Route path="/golivelistside" component={GoLiveListSide} />
    <Route path="/golives" component={GoLives} />
    <Route path="/kudos" component={KudoList} />
    <Route path="/kudos1" component={KudoList1} />
    <Route path="/kudosall" component={KudoListAll} />
    <Route path="/kudolistcomponent" component={KudoListComponent} />
    <Route path="/signin" component={Signin} />
    <Route path="/signout" component={Signout} />
    <Route path="/confirmation/:token" component={ResetPasswordForm} />
    <Route path="/forgot" component={RequestResetPassword} />
    <Route path="/reset/:token" component={UpdatePassword} />
    <Route path="/historyday" component={HistoryDayContainer} />
    <Route path="/historyall" component={HistoryDayAll} />
    <Route path="test/edit/:id" component={NewsItemContainer} />
    <Route path="test/new" component={NewsItemAddContainer} />
    <Route exact path="/courses" component={CourseList} />
    <Route exact path="/students" component={StudentListContainer} />
    <Route path="/students/:id" component={StudentView} />
    <Route path="/courses/edit/:id" component={CourseCard} />
    <Route exact path="/courses/create" component={AddCourseCard} />
    <Route path="/courses/addstudents/:id" component={AddStudentsToCourse} />
    <Route component={NotFound} />
  </Switch>
);

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  user: state.auth.user
});

export default AppRoutes;
