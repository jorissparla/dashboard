import React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Signin from "./auth/signin";
import SigninWithPIN from "./auth/SigninWithPIN";
import Signout from "./auth/signout";
import UpdatePassword from "./auth/resetpassword";
import RequireAuth, { AuthRoute, EnhancedRoute } from "./auth/require_auth";

//import NewsPage from "./news/newspage";
//import FeedbackEdit from "./feedback/feedbackEdit";
import { DashBoardContext, withDashBoardContext } from "./Provider";
import DynamicImport from "./DynamicImport";
import Loader from "./Loader";

const AGLTest = DynamicImport(() => import("./supportcard/Test"));
//const CommentsList = DynamicImport(() => import("./feedback/commentList"));
const FeedbackList = DynamicImport(() => import("./feedback/feedbackList"));

const Award = DynamicImport(() => import("./awards/award"));
const KudoListComponentNew = DynamicImport(() => import("./kudos/kudolistcomponentnew"));
const ResetPasswordForm = DynamicImport(() => import("./auth/ResetPasswordForm"));
const RequestResetPassword = DynamicImport(() => import("./auth/RequestResetPassword"));

const NewsListContainer = DynamicImport(() => import("./news/newslistcontainer"));
const NewsItemContainer = DynamicImport(() => import("./news/newsitemcontainer"));
const NewsItemAddContainer = DynamicImport(() => import("./news/newsitemaddcontainer"));
const RequestList = DynamicImport(() => import("./supportcard/RequestContainer"));
const RequestEdit = DynamicImport(() => import("./supportcard/RequestEdit"));
const ImageConverter = DynamicImport(() => import("./utils/ConvertImages"));
const CustomerCommentsPage = DynamicImport(() => import("./customers/pages/CustomerCommentsMain"));
const AnniversaryList = DynamicImport(() => import("./awards/Anniversaries"));

const ResolutionChart = DynamicImport(() => import("./charts/ResolutionChart"));

const CommentsList = DynamicImport(() => import("./feedback/commentList"));
const CourseList = DynamicImport(() => import("./courses/CourseList"));

const AccountList = DynamicImport(() => import("./Account/AccountList"));

const ChatContainer = DynamicImport(() => import("./chat/ChatContainer"));
const ChatList = DynamicImport(() => import("./chat/ChatList"));
const SmallCard = DynamicImport(() => import("./supportcard/SupportCard"));
//const DashBoard = Loader("./dashboard");
const DashBoard = DynamicImport(() => import("./dashboard"));
const DashBoardStats = DynamicImport(() => import("./dashboardstats"));
const DashBoardContainer = DynamicImport(() => import("./dashboardcontainer"));
const HistoryDayContainer = DynamicImport(() => import("./charts/historydaycontainer"));
const HistoryDayAll = DynamicImport(() => import("./charts/historydayallcontainer"));
const GoLiveListNew = DynamicImport(() => import("./golives/goLiveListNew"));
const GoLiveListSide = DynamicImport(() => import("./golives/golivelistside"));
const DashBoardStatsNew = DynamicImport(() => import("./DashBoardStatsNew"));
const SupportCards = DynamicImport(() => import("./supportcard/SupportCards"));

const RequestEditAdd = DynamicImport(() => import("./supportcard/Request"));
const SupportCardEdit = DynamicImport(() => import("./supportcard/SupportCardEdit"));
const SupportCardAdd = DynamicImport(() => import("./supportcard/SupportCardAdd"));
const CourseView = DynamicImport(() => import("./courses/CourseView"));
const CourseCard = DynamicImport(() => import("./courses/CourseCard"));
const AddCourseCard = DynamicImport(() => import("./courses/AddCourseCard"));
const StudentListContainer = DynamicImport(() => import("./courses/StudentListContainer"));
const StudentView = DynamicImport(() => import("./courses/StudentView"));
const AddStudentsToCourse = DynamicImport(() => import("./courses/AddStudentsToCourse"));

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
        <Route exact path="/smallcard" component={SmallCard} />
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
