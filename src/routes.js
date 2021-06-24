import { AddVideo, EditVideo } from "./videos/VideoOperations";
import React, { lazy } from "react";
import RequireAuth, { AuthRoute, EnhancedRoute } from "./auth/require_auth";
import { Route, Switch, useHistory } from "react-router-dom";

import Signin from "./auth/signin";
import SigninWithPIN from "./auth/SigninWithPIN";
import Signout from "./auth/signout";
import ToolsBacklogPage from "pages/tools";
import { UserContext } from "./globalState/UserProvider";
import { usePersistentState } from "hooks";
import { useUserContext } from "globalState/UserProvider";
import { withDashBoardContext } from "./globalState/Provider";

const TestRechart = lazy(() => import("pages/testrechart"));

const AddBlog = lazy(() => import("blog/addblog"));
const AddProject = lazy(() => import("projects/addproject"));
const AddSumo = lazy(() => import("./sumo/AddSumo"));
const AddSumoAlert = lazy(() => import("sumo/AddSumoAlert"));
const BlogList = lazy(() => import("blog/BlogList"));
const CloudInformation = lazy(() => import("pages/CloudInformation"));
const CloudReadiness = lazy(() => import("./pages/CloudReadiness"));
// const CloudSuites = lazy(() => import("./pages/CloudSuites"));
const DashBoardContainer = lazy(() => import("./pages/dashboardcontainer"));
const DynamicImport = lazy(() => import("./DynamicImport"));
const EditBlog = lazy(() => import("blog/EditBlog"));

const UserAdmin = lazy(() => import("UserAdmin"));
const UserPage = lazy(() => import("pages/UserPage"));
const UserPermissions = lazy(() => import("./UserPermissions"));
const VideoPage = lazy(() => import("./pages/Videos"));
const WorklistSimple = lazy(() => import("./pages/WorklistSimple"));
const testActivity = lazy(() => import("pages/testActivity"));
const TenantLogList = lazy(() => import("pages/TenantLogListNew"));
const SumoIncidentForm = lazy(() => import("sumo/SumoIncidentForm"));
const { Surveys } = lazy(() => import("./pages/Surveys"));
const SymptomCategories = lazy(() => import("symptoms/SymptomCategories"));
const { TenantLogsWithData } = lazy(() => import("tenants/TenantLogs"));
const TenantViewList = lazy(() => import("tenants/TenantViewList"));
const TestChart = lazy(() => import("pages/testchart"));
const TestLogin = lazy(() => import("./TestLogin"));
const TrainingGroups = lazy(() => import("pages/TrainingGroups"));
const UpdateProject = lazy(() => import("projects/updateproject"));
const UploadImageComponent = lazy(() => import("pages/UploadImageComponent"));
const MissingTenants = lazy(() => import("tenants/MissingTenants"));
const NewMaintenanceWizard = lazy(() => import("./pages/maintenance"));
const NewsItemContainer = lazy(() => import("./news/newsitemcontainer"));
const NewsPage = lazy(() => import("./pages/newspage"));
const NiceSpinner = lazy(() => import("utils/NiceSpinner"));
const OtherTeamsChartContainer = lazy(() => import("./charts/OtherTeamChartsContainer"));
const Parameters = lazy(() => import("./stats/Parameters"));
const PriorityDashboard = lazy(() => import("./stats/PriorityDashboard"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const Projects = lazy(() => import("pages/projects"));
const EditMaintenanceTemplate = lazy(() => import("pages/EditMaintenanceTemplate"));
const EditSumo = lazy(() => import("sumo/EditSumo"));
const EditSumoAlert = lazy(() => import("sumo/EditSumoAlert"));
const EditSumoIncident = lazy(() => import("sumo/EditSumoIncident"));
const FullTenantEdit = lazy(() => import("tenants/details/components/FullTenantEdit"));
const LNByRegionContainer = lazy(() => import("./charts/LNByRegionContainer"));
const LoginForm = lazy(() => import("./auth/LoginForm"));
const MailerLogDetail = lazy(() => import("pages/MailerLogDetail"));
const Mailerlog = lazy(() => import("pages/Mailerlog"));
const Main = lazy(() => import("pages/Main"));
const MaintenanceTemplates = lazy(() => import("pages/MaintenanceTemplates"));
const MaintenanceVersionList = lazy(() => import("./pages/MaintenanceVersionList"));
const Stats = lazy(() => import("./pages/Stats"));
const KBPage = lazy(() => import("./pages/KBPage"));
// const StatsMain = lazy(() => import('./pages/StatsMain'))
const SumoAlerts = lazy(() => import("pages/sumoalerts"));
const SumoIncidents = lazy(() => import("pages/sumoincidents"));
const SymptomsPage = lazy(() => import("pages/Symptoms"));
const SymptomsKBs = lazy(() => import("pages/SymptomsKBs"));
const Sumo = lazy(() => import("pages/sumo"));
const WhatDoesDev = lazy(() => import("pages/WhatDoesDev"));
const LoggedInUsers = lazy(() => import("./pages/loggedinusers"));
const Award = lazy(() => import("./awards/award"));
const ResetPasswordForm = lazy(() => import("./auth/ResetPasswordForm"));
const RequestResetPassword = lazy(() => import("./auth/RequestResetPassword"));

const NewsListContainer = lazy(() => import("./pages/newslistcontainer"));

const NewsItemAddContainer = lazy(() => import("./news/newsitemaddcontainer"));
const RequestList = lazy(() => import("./supportcard/RequestContainer"));
const RequestEdit = lazy(() => import("./supportcard/RequestEdit"));
const AddSupportCardRequest = lazy(() => import("./supportcard/Request"));
const ImageConverter = lazy(() => import("./utils/ConvertImages"));

const AnniversaryList = lazy(() => import("./awards/Anniversaries"));

const AccountList = lazy(() => import("./Account/AccountList"));

const SmallCard = lazy(() => import("./supportcard/SupportCard"));
// const DashBoardStats = lazy(() => import("./pages/dashboardstats"));

const HistoryDayContainer = lazy(() => import("./charts/historydaycontainer"));
const HistoryDayAll = lazy(() => import("./charts/historydayallcontainer"));
const GoLiveListNew = lazy(() => import("./pages/goLiveListNew"));
const GoLiveList = lazy(() => import("./pages/goLiveList"));

// const GoLiveListSide = lazy(() => import('./golives/golivelistside'));
const DashBoardStatsNew = lazy(() => import("./pages/DashBoardStatsNew"));
const SupportCards = lazy(() => import("./pages/SupportCards"));

const RequestEditAdd = lazy(() => import("./supportcard/Request"));
const SupportCardEdit = lazy(() => import("./supportcard/SupportCardEdit"));
const SupportCardAdd = lazy(() => import("./supportcard/SupportCardAdd"));

/*  */
const TenantPage = lazy(() => import("./pages/TenantPage"));
const VSummaryChart = lazy(() => import("./charts/VSummaryChart"));

const NotFound = () => {
  //withDashBoardContext(props => {
  return <h2>Not Found</h2>;
}; //);

// const TestUser = () => <UserProfileComponent />;

function AppRoutes() {
  //  const user = props.context;
  const { user, loading, login } = React.useContext(UserContext);
  const [debugMode, setDebugMode] = usePersistentState("debug", true);
  // useEffect(() => {
  //   if (debugMode && !user) {
  //     // login("joris.sparla@infor.com", "Infor2019");
  //   }
  // }, []);
  const history = useHistory();
  const userctx = useUserContext();
  // if (!userctx.user) userctx.login("joris.sparla@infor.com", "Infor2019").then(console.log);
  if (loading) return <NiceSpinner />;

  return (
    <Switch>
      <AuthRoute exact path="/essentialworklist" component={WorklistSimple} />
      <Route exact path="/tools" component={ToolsBacklogPage} />
      <Route exact path="/products/:product" component={ToolsBacklogPage} />
      <Route exact path="/whatdoesdev" component={WhatDoesDev} />
      <Route exact path="/tenantlog" component={TenantLogList} />
      <Route exact path="/addblog" component={AddBlog} />
      <Route exact path="/blog/:id" component={EditBlog} />
      <Route exact path="/blogs" component={BlogList} />
      <Route exact path="/essentialworklisttest" component={WorklistSimple} />
      <Route exact path="/testy" component={TestRechart} />
      <Route exact path="/trgroups" component={TrainingGroups} />
      <Route exact path="/charts" component={TestChart} />
      <Route exact path="/mailerlogs" component={Mailerlog} />
      <Route exact path="/mailerlogs/:id" component={MailerLogDetail} />
      <Route exact path="/symptomkbs" component={SymptomsKBs} />
      <Route exact path="/symptomcategories" component={SymptomCategories} />
      <Route exact path="/loggedinusers" component={LoggedInUsers} />
      {/* <Route exact path="/uploadimage" component={UploadImageComponent} />
      <Route exact path="/uploadfile" component={TWFileUpload} /> */}

      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/sumo" component={Sumo} />
      <Route exact path="/sumoalerts" component={SumoAlerts} />
      <Route exact path="/sumoincidents" component={SumoIncidents} />

      <Route exact path="/addsumo" component={AddSumo} />
      <Route exact path="/addsumoalert" component={AddSumoAlert} />

      <Route exact path="/addsumoincident" component={SumoIncidentForm} />
      <Route exact path="/editsumoincident/:id" component={EditSumoIncident} />

      <Route exact path="/editsumoalerts/:id" component={EditSumoAlert} />
      <Route exact path="/editsumo/:id" component={EditSumo} />

      <Route exact path="/cloudreadiness" component={CloudReadiness} />
      <Route exact path="/symptoms" component={SymptomsPage} />
      <Route exact path="/maintenancewizard" component={() => <MaintenanceVersionList productline="LN" />} />
      <Route exact path="/maintenance" component={() => <NewMaintenanceWizard />} />
      <Route exact path="/maintenancetemplates" component={() => <MaintenanceTemplates />} />
      <Route exact path="/maintenancetemplate/:id" component={() => <EditMaintenanceTemplate />} />

      <Route exact path="/maintenancewizardauto" component={() => <MaintenanceVersionList productline="AUTO" />} />
      <Route exact path="/tenantlogs" component={TenantLogsWithData} />
      <Route exact path="/tenantlogs1" component={TenantLogList} />
      <Route exact path="/tenantview" component={TenantViewList} />
      {/* <Route exact path="/details/:id" component={Details} /> */}
      <Route exact path="/stats" component={Stats} user={user} history={history} />
      <AuthRoute exact path="/statstest" component={Stats} user={user} history={history} />
      <AuthRoute exact path="/profilepage" component={ProfilePage} user={user} />
      <AuthRoute exact path="/profilepage/:id" component={UserPage} user={user} />
      <Route exact path="/profilepagex/:id" component={UserPage} user={user} />
      <AuthRoute exact path="/mywork" component={Stats} user={user} history={history} />
      <Route exact path="/working" component={Stats} user={user} history={history} />
      <AuthRoute exact path="/kbpage" component={KBPage} user={user} history={history} />
      <Route exact path="/main" component={Main} user={user} history={history} />

      <Route exact path="/myworkparams" component={Parameters} user={user} history={history} />
      <Route exact path="/" component={DashBoardContainer} user={user} />
      <Route exact path="/newspage" component={NewsPage} />

      <Route exact path="/priority" component={PriorityDashboard} history={history} user={user} />

      <EnhancedRoute auth="admin" editors={["Admin", "PO"]} user={user} exact path="/supportcard" component={SupportCards} />
      <Route exact path="/tenant" component={TenantPage} />
      <Route exact path="/tenant/missing" component={MissingTenants} />
      <Route exact path="/tenant/:customerid" component={FullTenantEdit} />

      <Route exact path="/region/:region" component={DashBoardContainer} user={user} />
      <Route exact path="/team/:team" component={DashBoardStatsNew} />
      {/* <Route exact path="/team/:team/region/:region" component={DashBoardStats} /> */}
      {/* <Route exact path="/fileupload" component={CourseFileUpload} />
      <EnhancedRoute exact path="/scheduledcourses/:id" component={PlannedCourses} user={user} />
      <Route exact path="/plannedcourserequestlist" component={PlannedCourseRequestList} /> */}
      {/* <EnhancedRoute exact path="/bla" component={RequireAuth(UserPermissions)} user={user} /> */}
      <EnhancedRoute exact path="/userpermissions" component={RequireAuth(UserPermissions)} user={user} />
      <Route exact path="/userpermissions1" component={UserPermissions} user={user} />
      <EnhancedRoute exact path="/b52" component={UserAdmin} user={user} />
      <EnhancedRoute exact path="/setpermissions" component={RequireAuth(UserPermissions)} user={user} />
      {/* <EnhancedRoute exact path="/xyz/:id" component={CourseEdit} user={user} />
      <EnhancedRoute exact path="/xyz/edit/:id" component={CourseEdit} user={user} />
      <EnhancedRoute exact path="/xyz/view/:id" component={CourseEdit} user={user} view={true} />
      <Route exact path="/scheduledcourses/:id/new" component={PlannedCourseAdd} />
      <Route exact path="/scheduledcourses/:id/edit/:id2" component={PlannedCourseEdit} /> */}
      {/* <Route exact path="/courses/create" component={CourseAdd} /> */}
      <Route exact path="/testlogin" component={TestLogin} />
      <Route exact path="/smallcard" component={SmallCard} />
      <AuthRoute auth="admin" allowed={["Admin", "PO"]} user={user} exact path="/accounts" component={AccountList} />
      <Route exact path="/image_convert" component={ImageConverter} />
      <Route exact path="/anniversaries" component={AnniversaryList} />

      <EnhancedRoute allowed={["Admin", "PO", "SU", "Guest", "Chat"]} user={user} exact path="/test" component={CloudInformation} />
      <EnhancedRoute allowed={["Admin", "PO", "SU", "Guest", "Chat"]} user={user} exact path="/projects" component={Projects} />
      <EnhancedRoute allowed={["Admin", "PO", "SU", "Guest", "Chat"]} user={user} exact path="/projects/add" component={AddProject} />
      <EnhancedRoute allowed={["Admin", "PO", "SU", "Guest", "Chat"]} user={user} exact path="/projects/update/:id" component={UpdateProject} />

      <EnhancedRoute allowed={["Admin", "PO", "SU", "Guest", "Chat"]} user={user} exact path="/cloudinfo" component={CloudInformation} />
      <EnhancedRoute allowed={["Admin", "PO", "SU", "Guest", "Chat"]} user={user} exact path="/cloudinformation" component={CloudInformation} />
      {/* <EnhancedRoute editors={["Admin", "PO", "SU"]} user={user} exact path="/coursedashboard" component={RequireAuth(CourseDashboard)} /> */}
      <EnhancedRoute editors={["Admin", "PO"]} user={user} exact path="/requestlist" component={RequireAuth(RequestList)} />
      <Route editors={["Admin", "PO"]} user={user} exact path="/requestlist1" component={RequestList} />
      <Route editors={["Admin", "PO"]} user={user} exact path="/addrequest1" component={AddSupportCardRequest} />
      <EnhancedRoute editors={["Admin", "PO"]} user={user} exact path="/addrequest" component={RequireAuth(AddSupportCardRequest)} />
      <EnhancedRoute editors={["Admin", "PO"]} user={user} path="/supportcard/request/:id" component={RequireAuth(RequestEdit)} />
      <EnhancedRoute editors={["Admin", "PO"]} user={user} path="/supportcard/filter/:text" component={SupportCards} />
      <Route path="award" component={Award} />
      <EnhancedRoute
        editors={["Admin", "PO", ""]}
        allowed={["Admin", "PO"]}
        permissions={["SUPPCARDEDIT", "ADMIN"]}
        user={user}
        path="/supportcard/edit/:id"
        component={RequireAuth(SupportCardEdit)}
      />
      {/* <Route
        editors={["Admin", "PO", ""]}
        allowed={["Admin", "PO"]}
        user={user}
        path="/supportcard/edit/:id"
        component={SupportCardEdit}
      /> */}
      <EnhancedRoute editors={["None"]} user={user} path="/supportcard/view/:id" component={SupportCardEdit} />
      <EnhancedRoute allowed={["Admin"]} editors={["Admin", "PO"]} user={user} exact path="/supportcard/add" component={SupportCardAdd} />
      <AuthRoute allowed={["Admin", "PO", "SU", "Guest", "Chat"]} user={user} exact path="/supportcard/request" component={RequestEditAdd} />
      <Route exact path="/news" component={NewsListContainer} />
      <AuthRoute allowed={["Admin", "PO", "SU"]} user={user} exact path="/news/edit/:id" component={RequireAuth(NewsItemContainer)} />
      <AuthRoute allowed={["Admin", "PO", "SU", "Guest"]} user={user} exact path="/news/add" component={RequireAuth(NewsItemAddContainer)} />
      <Route path="/golivelist" component={GoLiveList} />
      <Route path="/golives" component={GoLiveListNew} />
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
      <Route path="/historyln" component={LNByRegionContainer} />
      <Route path="test/edit/:id" component={NewsItemContainer} />
      <Route exact path="/test/dashboard" component={DashBoardStatsNew} />
      <Route exact path="/test/dashboard/team/:team" component={DashBoardStatsNew} />
      {/* <Route exact path="/courses" component={CourseList} user={user} /> */}
      {/* <Route exact path="/coursedashboard" component={CourseDashboard} /> */}
      {/* <Route exact path="/students" component={StudentListContainer} />
      <Route path="/students/:id" component={StudentView} /> */}
      {/* <AuthRoute allowed={["Admin", "PO"]} user={user} path="/courses/edit/:id" component={CourseEdit} /> */}
      {/* <AuthRoute
        allowed={["Admin", "PO", "SU", "Guest", "Chat"]}
        user={user}
        path="/courses/view/:id"
        component={(props) => <CourseEdit {...props} view={true} />}
      /> */}
      <Route exact path="/chart" component={VSummaryChart} />
      {/* <Route exact path="/addplannedcourserequest" component={AddPlannedCourseRequest} /> */}
      <Route exact path="/about" component={VideoPage} user={user} />
      <EnhancedRoute exact path="/videos" component={VideoPage} user={user} />
      <AuthRoute allowed={["Admin", "PO"]} user={user} exact path="/addvideo" component={AddVideo} />
      <AuthRoute allowed={["Admin", "PO"]} user={user} exact path="/editvideo/:id" component={EditVideo} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default withDashBoardContext(AppRoutes);
