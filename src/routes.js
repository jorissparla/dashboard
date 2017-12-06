import React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
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
import GoLiveListNew from "./golives/goLiveListNew";
import GoLiveListSide from "./golives/golivelistside";
import GoLives from "./golives/golives";
import Award from "./awards/award";
//import KudoList1 from "./kudos/kudolist1";
import KudoListComponent from "./kudos/kudolistcomponent";
//import KudoList from "./kudos/kudolist";
import KudoListAll from "./kudos/kudolistall";
import KudoListComponentNew from "./kudos/kudolistcomponentnew";
import Signin from "./auth/signin";
import Signout from "./auth/signout";
import UpdatePassword from "./auth/resetpassword";
import RequireAuth, { AuthRoute, EnhancedRoute } from "./auth/require_auth";
import ResetPasswordForm from "./auth/ResetPasswordForm";
import RequestResetPassword from "./auth/RequestResetPassword";

import NewsListContainer from "./news/newslistcontainer";
import NewsItemContainer from "./news/newsitemcontainer";
import NewsItemAddContainer from "./news/newsitemaddcontainer";

import SupportCards from "./supportcard/SupportCards";
import RequestEditAdd from "./supportcard/Request";
import SupportCardEdit from "./supportcard/SupportCardEdit";
import SupportCardAdd from "./supportcard/SupportCardAdd";
import CourseList from "./courses/CourseList";
import CourseView from "./courses/CourseView";
import CourseCard from "./courses/CourseCard";
import AddCourseCard from "./courses/AddCourseCard";
import StudentListContainer from "./courses/StudentListContainer";
import StudentView from "./courses/StudentView";
import AddStudentsToCourse from "./courses/AddStudentsToCourse";
import NewsPage from "./news/newspage";
//import SummaryChartContainer from "./charts/SummaryChartContainer";
//import ChatGraphContainer from "./charts/ChatGraphContainer";
import DashBoardStatsNew from "./DashBoardStatsNew";
import RequestList from "./supportcard/RequestContainer";
import RequestEdit from "./supportcard/RequestEdit";
import ImageConverter from "./utils/ConvertImages";

const NotFound = () => <h2>Not Found!</h2>;

class AppRoutes extends React.Component {
  render() {
    const { user } = this.props;
    if (!user) {
      console.log("loading");
      // return <div>Loading</div>;
    }
    return (
      <Switch>
        <AuthRoute
          allowed={["Admin", "PO", "SU"]}
          user={user}
          exact
          path="/test"
          component={CourseView}
        />
        <AuthRoute
          allowed={["Admin", "PO", "SU"]}
          user={user}
          exact
          path="/coursedashboard"
          component={CourseView}
        />
        <EnhancedRoute
          editors={["Admin", "PO"]}
          user={user}
          exact
          path="/requestlist"
          component={RequireAuth(RequestList)}
        />
        <EnhancedRoute
          editors={["Admin", "PO"]}
          user={user}
          path="/supportcard/request/:id"
          component={RequireAuth(RequestEdit)}
        />
        <Route exact path="/" component={DashBoardContainer} />
        <Route exact path="/region/:region" component={DashBoardContainer} />
        <Route exact path="/q/:id" component={DashBoardContainer} />
        <Route allowed={["Admin"]} user={user} path="/main/1" component={DashBoard} />
        <Route path="/main/0" component={DashBoard0} />
        <Route exact path="/team/:team" component={DashBoardStats} />
        <Route exact path="/team/:team/region/:region" component={DashBoardStats} />
        <Route exact path="/alerts" component={RequireAuth(AlertsList)} />
        <Route path="award" component={Award} />
        <EnhancedRoute
          auth="admin"
          editors={["Admin", "PO"]}
          user={user}
          exact
          path="/supportcard"
          component={SupportCards}
        />
        <EnhancedRoute
          editors={["Admin", "PO"]}
          allowed={["Admin", "PO"]}
          user={user}
          path="/supportcard/edit/:id"
          component={RequireAuth(SupportCardEdit)}
        />
        <EnhancedRoute
          editors={["Admin", "PO"]}
          user={user}
          path="/supportcard/view/:id"
          component={SupportCardEdit}
        />
        <EnhancedRoute
          allowed={["Admin"]}
          editors={["Admin", "PO"]}
          user={user}
          exact
          path="/supportcard/add"
          component={SupportCardAdd}
        />
        <AuthRoute
          allowed={["Admin", "PO", "SU", "Guest"]}
          user={user}
          exact
          path="/supportcard/request"
          component={RequestEditAdd}
        />
        <AuthRoute
          allowed={["Admin", "PO", "SU"]}
          user={user}
          exact
          path="/alerts/new"
          component={RequireAuth(AlertItemAddNew)}
        />
        <Route path="/alerts/:id" component={RequireAuth(AlertItem)} />
        <Route exact path="/news" component={NewsListContainer} />
        <AuthRoute
          allowed={["Admin", "PO", "SU"]}
          user={user}
          exact
          path="/news/edit/:id"
          component={RequireAuth(NewsItemContainer)}
        />
        <AuthRoute
          allowed={["Admin", "PO", "SU"]}
          user={user}
          exact
          path="/news/add"
          component={RequireAuth(NewsItemAddContainer)}
        />
        <Route exact path="/chat" component={RequireAuth(ChatList)} />
        <Route exact path="/chat/new" component={RequireAuth(ChatContainer)} />
        <AuthRoute
          allowed={["Admin", "PO", "SU"]}
          user={user}
          exact
          path="/news/add"
          component={RequireAuth(NewsItemAddContainer)}
        />

        <Route path="/golivelist" component={GoLiveListNew} />
        <Route path="/golivelist1" component={GoLiveList1} />
        <Route path="/golivelistside" component={GoLiveListSide} />
        <Route path="/golives" component={GoLiveListNew} />
        <Route path="/kudos" component={KudoListComponentNew} />
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
        <Route exact path="/courseview" component={CourseView} />
        <Route exact path="/students" component={StudentListContainer} />
        <Route path="/students/:id" component={StudentView} />
        <AuthRoute
          allowed={["Admin", "PO"]}
          user={user}
          path="/courses/edit/:id"
          component={CourseCard}
        />
        <AuthRoute
          allowed={["Admin", "PO"]}
          user={user}
          exact
          path="/courses/create"
          component={AddCourseCard}
        />
        <AuthRoute
          allowed={["Admin", "PO"]}
          user={user}
          path="/courses/addstudents/:id"
          component={AddStudentsToCourse}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  user: state.auth.user
});

export default withRouter(connect(mapStateToProps)(AppRoutes));
