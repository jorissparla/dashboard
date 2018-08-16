import React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import ChatList from "./chat/ChatList";
import ChatContainer from "./chat/ChatContainer";
import DashBoard from "./dashboard";
import DashBoardStats from "./dashboardstats";
import DashBoardContainer from "./dashboardcontainer";
import HistoryDayContainer from "./charts/historydaycontainer";
import HistoryDayAll from "./charts/historydayallcontainer";
import GoLiveListNew from "./golives/goLiveListNew";
import GoLiveListSide from "./golives/golivelistside";
import Award from "./awards/award";
import KudoListComponentNew from "./kudos/kudolistcomponentnew";
import Signin from "./auth/signin";
import SigninWithPIN from "./auth/SigninWithPIN";
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
//import CourseList from "./courses/CourseList";

import CourseView from "./courses/CourseView";
import CourseCard from "./courses/CourseCard";
import AddCourseCard from "./courses/AddCourseCard";
import StudentListContainer from "./courses/StudentListContainer";
import StudentView from "./courses/StudentView";
import AddStudentsToCourse from "./courses/AddStudentsToCourse";

//import SummaryChartContainer from "./charts/SummaryChartContainer";
//import ChatGraphContainer from "./charts/ChatGraphContainer";
import DashBoardStatsNew from "./DashBoardStatsNew";
import RequestList from "./supportcard/RequestContainer";
import RequestEdit from "./supportcard/RequestEdit";
import ImageConverter from "./utils/ConvertImages";
import CustomerCommentsPage from "./customers/pages/CustomerCommentsMain";
import AnniversaryList from "./awards/Anniversaries";
import AGLTest from "./supportcard/Test";
//import CommentsList from "./feedback/commentList";
import FeedbackList from "./feedback/feedbackList";
import NewsPage from "./news/newspage";
//import FeedbackEdit from "./feedback/feedbackEdit";
import { DashBoardContext, withDashBoardContext } from "./Provider";
import AniNews from "./news/aninews";
import DynamicImport from "./DynamicImport";
import ResolutionChart from "./charts/ResolutionChart";

const CommentsList = DynamicImport(() => import("./feedback/commentList"));
const CourseList = DynamicImport(() => import("./courses/CourseList"));

const AccountList = DynamicImport(() => import("./Account/AccountList"));

const NotFound = props => {
  //withDashBoardContext(props => {
  return <h2>Not Found</h2>;
}; //);

class AppRoutes extends React.Component {
  render() {
    const { user } = this.props;
    if (!user) {
      console.log("loading");
      // return <div>Loading</div>;
    }
    return (
      <Switch>
        <Route exact path="/comments" component={CommentsList} />
        <AuthRoute
          auth="admin"
          allowed={["Admin", "PO"]}
          user={user}
          exact
          path="/accounts"
          component={AccountList}
        />
        <Route exact path="/customercomments" component={CustomerCommentsPage} />
        <EnhancedRoute
          auth="admin"
          editors={["Admin", "PO"]}
          user={user}
          exact
          path="/feedback"
          component={FeedbackList}
        />
        <Route exact path="/image_convert" component={ImageConverter} />
        <Route exact path="/agltest" component={AGLTest} />
        <Route exact path="/anniversaries" component={AnniversaryList} />
        <AuthRoute
          allowed={["Admin", "PO", "SU", "Guest", "Chat"]}
          user={user}
          exact
          path="/test"
          component={ResolutionChart}
        />
        <EnhancedRoute
          editors={["Admin", "PO", "SU"]}
          user={user}
          exact
          path="/coursedashboard"
          component={RequireAuth(CourseView)}
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
        <Route exact path="/team/:team" component={DashBoardStatsNew} />
        <Route exact path="/team/:team/region/:region" component={DashBoardStats} />
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
          editors={["None"]}
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
          allowed={["Admin", "PO", "SU", "Guest", "Chat"]}
          user={user}
          exact
          path="/supportcard/request"
          component={RequestEditAdd}
        />

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
        <AuthRoute
          allowed={["Admin", "PO", "SU", "Chat"]}
          user={user}
          exact
          path="/chat"
          component={RequireAuth(ChatList)}
        />
        <AuthRoute
          allowed={["Admin", "PO", "SU", "Chat"]}
          user={user}
          exact
          exact
          path="/chat/new"
          component={RequireAuth(ChatContainer)}
        />
        <AuthRoute
          allowed={["Admin", "PO", "SU"]}
          user={user}
          exact
          path="/news/add"
          component={RequireAuth(NewsItemAddContainer)}
        />

        <Route path="/golivelist" component={GoLiveListNew} />
        <Route path="/golivelistside" component={GoLiveListSide} />
        <Route path="/golives" component={GoLiveListNew} />
        <Route path="/kudos" component={KudoListComponentNew} />
        <Route path="/signin" component={Signin} />
        <Route path="/signinPIN" component={SigninWithPIN} />
        <Route path="/signout" component={Signout} />
        <Route path="/confirmation/:token" component={ResetPasswordForm} />
        <Route path="/forgot" component={RequestResetPassword} />
        <Route path="/reset/:token" component={UpdatePassword} />
        <Route path="/historyday" component={HistoryDayContainer} />
        <Route path="/historyall" component={HistoryDayAll} />
        <Route path="test/edit/:id" component={NewsItemContainer} />
        <Route exact path="/test/dashboard" component={DashBoardStatsNew} />
        <Route exact path="/test/dashboard/team/:team" component={DashBoardStatsNew} />
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
          allowed={["Admin", "PO", "SU", "Guest", "Chat"]}
          user={user}
          path="/courses/view/:id"
          component={props => <CourseCard {...props} view={true} />}
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
