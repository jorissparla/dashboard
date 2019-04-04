import React from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import RequireAuth, { AuthRoute, EnhancedRoute } from './auth/require_auth';
import Signin from './auth/signin';
import SigninWithPIN from './auth/SigninWithPIN';
import Signout from './auth/signout';
import CourseAdd from './courses/CourseAdd';
import CourseEdit from './courses/CourseEdit';
import CourseFileUpload from './courses/CourseFileUpload';
import PlannedCourseAdd from './courses/PlannedCourseAdd';
import PlannedCourseEdit from './courses/PlannedCourseEdit';
import PlannedCourses from './courses/PlannedCoursesNew';
import DynamicImport from './DynamicImport';
import NewsItemContainer from './news/newsitemcontainer';
import DashBoardContainer from './pages/dashboardcontainer';
import NewsPage from './pages/newspage';
import PlannedCourseRequestList from './pages/PlannedCourseRequestList';
import VideoPage from './pages/Videos';
import { withDashBoardContext } from './Provider';
import TestLogin from './TestLogin';
import User, { UserProfileComponent, withUser } from './User';
import UserPermissions from './UserPermissions';
import { AddVideo, EditVideo } from './videos/VideoOperations';
const StatsMain = DynamicImport(() => import('./pages/StatsMain'));
//const StatsMain = React.lazy(() => import('./kudos/kudolistcomponentnew'));
//const CommentsList = DynamicImport(() => import("./feedback/commentList"));
const FeedbackList = DynamicImport(() => import('./pages/feedbackList'));
const AddFeedback = DynamicImport(() => import('./feedback/AddFeedback'));

const Award = DynamicImport(() => import('./awards/award'));
const KudoListComponentNew = DynamicImport(() => import('./kudos/kudolistcomponentnew'));
const ResetPasswordForm = DynamicImport(() => import('./auth/ResetPasswordForm'));
const RequestResetPassword = DynamicImport(() => import('./auth/RequestResetPassword'));

const NewsListContainer = DynamicImport(() => import('./pages/newslistcontainer'));

const NewsItemAddContainer = DynamicImport(() => import('./news/newsitemaddcontainer'));
const RequestList = DynamicImport(() => import('./supportcard/RequestContainer'));
const RequestEdit = DynamicImport(() => import('./supportcard/RequestEdit'));
const AddSupportCardRequest = DynamicImport(() => import('./supportcard/Request'));
const ImageConverter = DynamicImport(() => import('./utils/ConvertImages'));

const AnniversaryList = DynamicImport(() => import('./awards/Anniversaries'));

const ResolutionChart = DynamicImport(() => import('./charts/ResolutionChart'));

const CommentsList = DynamicImport(() => import('./feedback/commentList'));
const CourseList = DynamicImport(() => import('./pages/CourseList'));

const AccountList = DynamicImport(() => import('./Account/AccountList'));

const ChatContainer = DynamicImport(() => import('./chat/ChatContainer'));
const ChatList = DynamicImport(() => import('./pages/ChatList'));
const SmallCard = DynamicImport(() => import('./supportcard/SupportCard'));
const DashBoardStats = DynamicImport(() => import('./pages/dashboardstats'));

const HistoryDayContainer = DynamicImport(() => import('./charts/historydaycontainer'));
const HistoryDayAll = DynamicImport(() => import('./charts/historydayallcontainer'));
const GoLiveListNew = DynamicImport(() => import('./pages/goLiveListNew'));
const GoLiveListSide = DynamicImport(() => import('./golives/golivelistside'));
const DashBoardStatsNew = DynamicImport(() => import('./pages/DashBoardStatsNew'));
const SupportCards = DynamicImport(() => import('./pages/SupportCards'));

const RequestEditAdd = DynamicImport(() => import('./supportcard/Request'));
const SupportCardEdit = DynamicImport(() => import('./supportcard/SupportCardEdit'));
const SupportCardAdd = DynamicImport(() => import('./supportcard/SupportCardAdd'));
const CourseView = DynamicImport(() => import('./pages/CourseView'));
const StudentListContainer = DynamicImport(() => import('./courses/StudentTableNew'));
const StudentView = DynamicImport(() => import('./courses/StudentView'));

const AddPlannedCourseRequest = DynamicImport(() => import('./courses/AddPlannedCourseRequest'));
const TenantList = DynamicImport(() => import('./pages/TenantList'));
const DonutChart = DynamicImport(() => import('./charts/DonutChart'));
const VSummaryChart = DynamicImport(() => import('./charts/VSummaryChart'));

const NotFound = props => {
  //withDashBoardContext(props => {
  return <h2>Not Found</h2>;
}; //);

const TestUser2 = () => {
  const res = withUser();

  return <div>{JSON.stringify(res)}</div>;
};
const TestUser = () => <UserProfileComponent />;

class AppRoutes extends React.Component {
  render() {
    const user = this.props.context;
    //const authenticated = this.props.context.authenticated();

    return (
      <User>
        {({ data, loading }) => {
          if (loading) {
            return 'loading...';
          }

          return (
            <Switch>
              <AuthRoute exact path="/statsmain" component={StatsMain} user={user} />
              <Route exact path="/" component={DashBoardContainer} />
              <Route exact path="/newspage" component={NewsPage} />
              <EnhancedRoute
                auth="admin"
                editors={['Admin', 'PO']}
                user={user}
                exact
                path="/supportcard"
                component={SupportCards}
              />
              <Route exact path="/tenant" component={TenantList} />
              />
              <Route exact path="/region/:region" component={DashBoardContainer} />
              <Route exact path="/team/:team" component={DashBoardStatsNew} />
              <Route exact path="/team/:team/region/:region" component={DashBoardStats} />
              <Route exact path="/fileupload" component={CourseFileUpload} />
              <EnhancedRoute
                exact
                path="/scheduledcourses/:id"
                component={PlannedCourses}
                user={user}
              />
              <Route exact path="/plannedcourserequestlist" component={PlannedCourseRequestList} />
              <EnhancedRoute exact path="/bla" component={UserPermissions} user={user} />
              <EnhancedRoute exact path="/xyz/:id" component={CourseEdit} user={user} />
              <EnhancedRoute exact path="/xyz/edit/:id" component={CourseEdit} user={user} />
              <EnhancedRoute
                exact
                path="/xyz/view/:id"
                component={CourseEdit}
                user={user}
                view={true}
              />
              <Route exact path="/scheduledcourses/:id/new" component={PlannedCourseAdd} />
              <Route exact path="/scheduledcourses/:id/edit/:id2" component={PlannedCourseEdit} />
              <Route exact path="/courses/create" component={CourseAdd} />
              <Route exact path="/testlogin" component={TestLogin} />
              <Route exact path="/comments" component={CommentsList} />
              <Route exact path="/smallcard" component={SmallCard} />
              <AuthRoute
                auth="admin"
                allowed={['Admin', 'PO']}
                user={user}
                exact
                path="/accounts"
                component={AccountList}
              />
              <EnhancedRoute
                auth="admin"
                editors={['Admin', 'PO']}
                user={user}
                exact
                path="/feedback"
                component={FeedbackList}
              />
              <EnhancedRoute
                auth="admin"
                editors={['Admin', 'PO']}
                user={user}
                exact
                path="/addfeedback"
                component={AddFeedback}
              />
              <Route exact path="/image_convert" component={ImageConverter} />
              <Route exact path="/anniversaries" component={AnniversaryList} />
              <AuthRoute
                allowed={['Admin', 'PO', 'SU', 'Guest', 'Chat']}
                user={user}
                exact
                path="/test"
                component={TestUser}
              />
              <EnhancedRoute
                editors={['Admin', 'PO', 'SU']}
                user={user}
                exact
                path="/coursedashboard"
                component={RequireAuth(CourseView)}
              />
              <EnhancedRoute
                editors={['Admin', 'PO']}
                user={user}
                exact
                path="/requestlist"
                component={RequireAuth(RequestList)}
              />
              <EnhancedRoute
                editors={['Admin', 'PO']}
                user={user}
                exact
                path="/addrequest"
                component={RequireAuth(AddSupportCardRequest)}
              />
              <EnhancedRoute
                editors={['Admin', 'PO']}
                user={user}
                path="/supportcard/request/:id"
                component={RequireAuth(RequestEdit)}
              />
              <Route path="award" component={Award} />
              <EnhancedRoute
                editors={['Admin', 'PO']}
                allowed={['Admin', 'PO']}
                user={user}
                path="/supportcard/edit/:id"
                component={RequireAuth(SupportCardEdit)}
              />
              <EnhancedRoute
                editors={['None']}
                user={user}
                path="/supportcard/view/:id"
                component={SupportCardEdit}
              />
              <EnhancedRoute
                allowed={['Admin']}
                editors={['Admin', 'PO']}
                user={user}
                exact
                path="/supportcard/add"
                component={SupportCardAdd}
              />
              <AuthRoute
                allowed={['Admin', 'PO', 'SU', 'Guest', 'Chat']}
                user={user}
                exact
                path="/supportcard/request"
                component={RequestEditAdd}
              />
              <Route exact path="/news" component={NewsListContainer} />
              <AuthRoute
                allowed={['Admin', 'PO', 'SU']}
                user={user}
                exact
                path="/news/edit/:id"
                component={RequireAuth(NewsItemContainer)}
              />
              <AuthRoute
                allowed={['Admin', 'PO', 'SU', 'Chat']}
                user={user}
                exact
                path="/chat"
                component={RequireAuth(ChatList)}
              />
              <AuthRoute
                allowed={['Admin', 'PO', 'SU', 'Chat']}
                user={user}
                exact
                path="/chat/new"
                component={RequireAuth(ChatContainer)}
              />
              <AuthRoute
                allowed={['Admin', 'PO', 'SU', 'Guest']}
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
              <Route path="/historyday" component={HistoryDayContainer} />
              <Route path="/historyall" component={HistoryDayAll} />
              <Route path="test/edit/:id" component={NewsItemContainer} />
              <Route exact path="/test/dashboard" component={DashBoardStatsNew} />
              <Route exact path="/test/dashboard/team/:team" component={DashBoardStatsNew} />
              <Route exact path="/courses" component={CourseList} user={user} />
              <Route exact path="/courseview" component={CourseView} />
              <Route exact path="/students" component={StudentListContainer} />
              <Route path="/students/:id" component={StudentView} />
              <AuthRoute
                allowed={['Admin', 'PO']}
                user={user}
                path="/courses/edit/:id"
                component={CourseEdit}
              />
              <AuthRoute
                allowed={['Admin', 'PO', 'SU', 'Guest', 'Chat']}
                user={user}
                path="/courses/view/:id"
                component={props => <CourseEdit {...props} view={true} />}
              />
              />
              <Route exact path="/chart" component={VSummaryChart} />
              <Route exact path="/donut" component={DonutChart} />
              <Route exact path="/addplannedcourserequest" component={AddPlannedCourseRequest} />
              <Route exact path="/about" component={VideoPage} user={user} />
              <EnhancedRoute exact path="/videos" component={VideoPage} user={user} />
              <AuthRoute
                allowed={['Admin', 'PO']}
                user={user}
                exact
                path="/addvideo"
                component={AddVideo}
              />
              <AuthRoute
                allowed={['Admin', 'PO']}
                user={user}
                exact
                path="/editvideo/:id"
                component={EditVideo}
              />
              <Route component={NotFound} />
            </Switch>
          );
        }}
      </User>
    );
  }
}

export default withRouter(withDashBoardContext(AppRoutes));
