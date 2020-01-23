import React from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import Basic from 'stats/Basic';
import { TenantLogsWithData } from 'tenants/TenantLogs';
import RequireAuth, { AuthRoute, EnhancedRoute } from './auth/require_auth';
import Signin from './auth/signin';
import SigninWithPIN from './auth/SigninWithPIN';
import Signout from './auth/signout';
import Product from './cloudsuite/Product';
import CourseAdd from './courses/CourseAdd';
import CourseEdit from './courses/CourseEdit';
import CourseFileUpload from './courses/CourseFileUpload';
import PlannedCourseAdd from './courses/PlannedCourseAdd';
import PlannedCourseEdit from './courses/PlannedCourseEdit';
import PlannedCourses from './courses/PlannedCoursesNew';
import DynamicImport from './DynamicImport';
import { withDashBoardContext } from './globalState/Provider';
import { UserContext } from './globalState/UserProvider';
import NewsItemContainer from './news/newsitemcontainer';
import CloudSuites, { CloudSuitePage } from './pages/CloudSuites';
import DashBoardContainer from './pages/dashboardcontainer';
import NewsPage from './pages/newspage';
import PlannedCourseRequestList from './pages/PlannedCourseRequestList';
import ProfilePage from './pages/ProfilePage';
import { StatsPage } from './pages/StatsPage2';
import { Surveys } from './pages/Surveys';
import VideoPage from './pages/Videos';
import { Parameters } from './stats/Parameters';
import PriorityDashboard from './stats/PriorityDashboard';
import Details from './tenants/details/index';
import TestLogin from './TestLogin';
import { UserProfileComponent } from './User';
import UserPermissions from './UserPermissions';
import { AddVideo, EditVideo } from './videos/VideoOperations';
import OtherTeamsChartContainer from './charts/OtherTeamChartsContainer';
import MaintenanceVersionList from './pages/MaintenanceVersionList';
import TenantViewList from 'tenants/TenantViewList';
import SymptomsPage from 'pages/Symptoms';

import Playground from './pages/Playground';
const StatsMain = DynamicImport(() => import('./pages/StatsMain'));

//const StatsMain = React.lazy(() => import('./kudos/kudolistcomponentnew'));

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

//const ResolutionChart = DynamicImport(() => import('./charts/ResolutionChart'));

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
const CourseDashboard = DynamicImport(() => import('./pages/CourseDashboard'));
const StudentListContainer = DynamicImport(() => import('./courses/StudentTableNew'));
const StudentView = DynamicImport(() => import('./courses/StudentView'));

const AddPlannedCourseRequest = DynamicImport(() => import('./courses/AddPlannedCourseRequest'));
const TenantPage = DynamicImport(() => import('./pages/TenantPage'));
const DonutChart = DynamicImport(() => import('./charts/DonutChart'));
const VSummaryChart = DynamicImport(() => import('./charts/VSummaryChart'));

const NotFound = props => {
  //withDashBoardContext(props => {
  return <h2>Not Found</h2>;
}; //);

const TestUser = () => <UserProfileComponent />;

function AppRoutes(props) {
  //  const user = props.context;
  const { user } = React.useContext(UserContext);

  return (
    <Switch>
      <Route exact path="/playground" component={Playground} />
      <Route exact path="/symptoms" component={SymptomsPage} />
      <Route exact path="/maintenancewizard" component={MaintenanceVersionList} />
      <Route exact path="/tenantlogs" component={TenantLogsWithData} />
      <Route exact path="/tenantview" component={TenantViewList} />
      <Route exact path="/details/:id" component={Details} />
      <AuthRoute
        exact
        path="/statsmain"
        component={StatsPage}
        user={user}
        history={props.history}
      />
      <AuthRoute exact path="/statstest" component={Basic} user={user} history={props.history} />
      <AuthRoute exact path="/profilepage" component={ProfilePage} user={user} />
      <AuthRoute exact path="/mywork" component={StatsMain} user={user} history={props.history} />
      <AuthRoute
        exact
        path="/myworkparams"
        component={Parameters}
        user={user}
        history={props.history}
      />
      <Route exact path="/" component={DashBoardContainer} user={user} />
      <Route exact path="/newspage" component={NewsPage} />
      <Route
        exact
        path="/cloudsuites"
        component={CloudSuites}
        history={props.history}
        user={user}
      />
      <Route
        exact
        path="/cloudsuites/product/:id"
        component={Product}
        history={props.history}
        user={user}
      />
      <Route
        exact
        path="/priority"
        component={PriorityDashboard}
        history={props.history}
        user={user}
      />
      <Route
        exact
        path="/cloudsuite/:id"
        component={CloudSuitePage}
        history={props.history}
        user={user}
      />
      <EnhancedRoute
        auth="admin"
        editors={['Admin', 'PO']}
        user={user}
        exact
        path="/supportcard"
        component={SupportCards}
      />
      <Route exact path="/tenant" component={TenantPage} />
      />
      <Route exact path="/region/:region" component={DashBoardContainer} user={user} />
      <Route exact path="/team/:team" component={DashBoardStatsNew} />
      <Route exact path="/team/:team/region/:region" component={DashBoardStats} />
      <Route exact path="/fileupload" component={CourseFileUpload} />
      <EnhancedRoute exact path="/scheduledcourses/:id" component={PlannedCourses} user={user} />
      <Route exact path="/plannedcourserequestlist" component={PlannedCourseRequestList} />
      <EnhancedRoute exact path="/bla" component={UserPermissions} user={user} />
      <EnhancedRoute exact path="/setpermissions" component={UserPermissions} user={user} />
      <EnhancedRoute exact path="/xyz/:id" component={CourseEdit} user={user} />
      <EnhancedRoute exact path="/xyz/edit/:id" component={CourseEdit} user={user} />
      <EnhancedRoute exact path="/xyz/view/:id" component={CourseEdit} user={user} view={true} />
      <Route exact path="/scheduledcourses/:id/new" component={PlannedCourseAdd} />
      <Route exact path="/scheduledcourses/:id/edit/:id2" component={PlannedCourseEdit} />
      <Route exact path="/courses/create" component={CourseAdd} />
      <Route exact path="/testlogin" component={TestLogin} />
      <Route exact path="/smallcard" component={SmallCard} />
      <AuthRoute
        auth="admin"
        allowed={['Admin', 'PO']}
        user={user}
        exact
        path="/accounts"
        component={AccountList}
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
        component={RequireAuth(CourseDashboard)}
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
      <EnhancedRoute
        editors={['Admin', 'PO']}
        user={user}
        path="/supportcard/filter/:text"
        component={SupportCards}
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
      <Route exact path="/surveys/:id" component={Surveys} />
      <Route exact path="/surveys" component={Surveys} />
      <Route path="/signin" component={Signin} />
      <Route path="/signinPIN" component={SigninWithPIN} />
      <Route path="/signout" component={Signout} />
      <Route path="/confirmation/:token" component={ResetPasswordForm} />
      <Route path="/forgot" component={RequestResetPassword} />
      <Route path="/historyday" component={HistoryDayContainer} />
      <Route path="/historyall" component={HistoryDayAll} />
      <Route path="/historyother" component={OtherTeamsChartContainer} />
      <Route path="test/edit/:id" component={NewsItemContainer} />
      <Route exact path="/test/dashboard" component={DashBoardStatsNew} />
      <Route exact path="/test/dashboard/team/:team" component={DashBoardStatsNew} />
      <Route exact path="/courses" component={CourseList} user={user} />
      <Route exact path="/coursedashboard" component={CourseDashboard} />
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
}

export default withRouter(withDashBoardContext(AppRoutes));
