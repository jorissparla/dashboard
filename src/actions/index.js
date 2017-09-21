import axios from "axios";
//import { withRouter } from "react-router-dom";

export const FETCH_SUMMARY = "FETCH_SUMMARY";
export const FETCH_CHAT = "FETCH_CHAT";
export const CREATE_CHAT = "CREATE_CHAT";
export const FETCH_RANGES = "FETCH_RANGES";
export const FETCH_HISTORY = "FETCH_HISTORY";
export const FETCH_HISTORY_DAY = "FETCH_HISTORY_DAY";
export const FETCH_GOLIVES = "FETCH_GOLIVES";
export const FETCH_NEWS = "FETCH_NEWS";
export const FETCH_NEWS_ITEM = "FETCH_NEWS_ITEM";
export const SHOW_NEWS = "SHOW_NEWS";
export const CREATE_NEWS = "CREATE_NEWS";
export const UPDATE_NEWS = "UPDATE_NEWS";
export const DELETE_NEWS = "DELETE_NEWS";
export const FETCH_KUDOS = "FETCH_KUDOS";
export const FETCH_ALERTS = "FETCH_ALERTS";
export const CREATE_ALERTS = "CREATE_ALERTS";
export const UPDATE_ALERTS = "UPDATE_ALERTS";
export const DELETE_ALERT = "DELETE_ALERT";

export const AUTH_USER = "AUTH_USER";
export const UNAUTH_USER = "UNAUTH_USER";
export const AUTH_ERROR = "AUTH_ERROR";
export const AUTH_FORGOT = "AUTH_FORGOT";
export const AUTH_PASS = "AUTH_PASS";
export const FETCH_MESSAGE = "FETCH_MESSAGE";

export const FETCH_COURSES = "FETCH_COURSES";
export const FIND_ENROLLEDCOURSES = "FIND_ENROLLEDCOURSES";
export const FETCH_COURSE = "FETCH_COURSE";
export const CREATE_COURSE = "CREATE_COURSE";
export const UPDATE_COURSE = "UPDATE_COURSE";
export const COURSE_COMPLETE = "COURSE_COMPLETE";

export const FETCH_ACCOUNTS = "FETCH_ACCOUNTS";
export const FIND_STUDENTS = "FIND_STUDENTS";
export const ENROLL_STUDENT = "ENROLL_STUDENT";

const ROOT_URL = "http://nlbavwtls22:3001/api";
//const ROOT_URL = "http://localhost:3001/api";

const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};

function to(promise) {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
}

const signinUser = async ({ email, password }) => {
  return async dispatch => {
    let err, response;
    [err, response] = await to(
      axios.post(`${ROOT_URL}/signin`, { email, password })
    );
    if (err) {
      dispatch(authError("Bad Login Info"));
      return;
    }
    if (response) {
      console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", email);
      localStorage.setItem("picture", response.data.user.pic);
      localStorage.setItem("role", response.data.user.role);
      dispatch({ type: AUTH_USER, user: response.data.user });
      return;
      //browserHistory.push("/");
    }
  };
};

exports.forgotPassword = async email => {
  await axios.post(`${ROOT_URL}/forgot`, { email });
  return { type: AUTH_FORGOT };
};

exports.UpdatePassword = async ({ password, token }) => {
  await axios.post(`${ROOT_URL}/updatemypassword`, {
    password,
    token
  });

  return { type: AUTH_PASS };
};

const signoutUser = () => {
  localStorage.removeItem("token");
  localStorage.setItem("email", "");
  localStorage.setItem("picture", "");

  return { type: UNAUTH_USER };
};

const fetchAccounts = () => {
  const request = axios.get(ROOT_URL + "/accounts");
  return {
    type: FETCH_ACCOUNTS,
    payload: request
  };
};

const fetchSummary = () => {
  const request = axios.get(ROOT_URL + "/summary");
  return {
    type: FETCH_SUMMARY,
    payload: request
  };
};

const fetchChat = () => {
  const request = axios.get(ROOT_URL + "/chat");
  return {
    type: FETCH_CHAT,
    payload: request
  };
};

const createChat = chatData => {
  const request = axios.put(ROOT_URL + "/chat", chatData);
  return {
    type: CREATE_CHAT,
    payload: request
  };
};

const fetchRanges = () => {
  const request = axios.get(ROOT_URL + "/ranges");
  return {
    type: FETCH_RANGES,
    payload: request
  };
};

const fetchGoLives = () => {
  const request = axios.get(ROOT_URL + "/golives");
  return {
    type: FETCH_GOLIVES,
    payload: request
  };
};

const fetchHistory = () => {
  const request = axios.get(ROOT_URL + "/history");
  return {
    type: FETCH_HISTORY,
    payload: request
  };
};

const fetchHistoryDay = () => {
  const request = axios.get(ROOT_URL + "/historyday");
  return {
    type: FETCH_HISTORY_DAY,
    payload: request
  };
};
const fetchNews = () => {
  const request = axios.get(ROOT_URL + "/news");
  return {
    type: FETCH_NEWS,
    payload: request
  };
};

const fetchNewsItem = id => {
  const request = axios.get(ROOT_URL + "/news/" + id);
  return {
    type: FETCH_NEWS_ITEM,
    payload: request
  };
};

const createNews = props => {
  const request = axios.put(ROOT_URL + "/news", props);
  return {
    type: CREATE_NEWS,
    payload: request
  };
};

const updateNews = props => {
  const request = axios.post(ROOT_URL + "/news/update", props);
  return {
    type: UPDATE_NEWS,
    payload: request
  };
};

const fetchKudos = () => {
  const request = axios.get(ROOT_URL + "/kudos");
  return {
    type: FETCH_KUDOS,
    payload: request
  };
};

const fetchAlerts = () => {
  const request = axios.get(ROOT_URL + "/alerts");
  return {
    type: FETCH_ALERTS,
    payload: request
  };
};

const fetchAlertItem = id => {
  const request = axios.get(ROOT_URL + "/alerts/" + id);
  return {
    type: FETCH_ALERTS,
    payload: request
  };
};

const createAlert = props => {
  const request = axios.put(ROOT_URL + "/alerts", props);
  return {
    type: CREATE_ALERTS,
    payload: request
  };
};

const updateAlerts = props => {
  const request = axios.post(ROOT_URL + "/alerts/update", props);
  return {
    type: UPDATE_ALERTS,
    payload: request
  };
};

const deleteAlert = id => {
  const request = axios.delete(ROOT_URL + "/alerts/" + id);
  return {
    type: DELETE_ALERT,
    payload: request
  };
};
const deleteNews = id => {
  const request = axios.delete(ROOT_URL + "/news/" + id);
  return {
    type: DELETE_NEWS,
    payload: request
  };
};

const fetchCourses = () => {
  const request = axios.get(ROOT_URL + "/courses/");
  return {
    type: FETCH_COURSES,
    payload: request
  };
};

const createCourse = props => {
  const request = axios.put(ROOT_URL + "/courses/", props);
  return {
    type: CREATE_COURSE,
    payload: request
  };
};

const updateCourse = props => {
  const request = axios.post(ROOT_URL + "/courses/", props);
  return {
    type: UPDATE_COURSE,
    payload: request
  };
};

const fetchCourse = id => {
  const request = axios.get(ROOT_URL + "/courses/" + id);
  return {
    type: FETCH_COURSE,
    payload: request
  };
};

const findStudents = id => {
  const request = axios.get(ROOT_URL + "/findStudents/" + id);
  return {
    type: FIND_STUDENTS,
    payload: request
  };
};

const findAllEnrolledCourses = () => {
  const request = axios.get(ROOT_URL + "/listenrolledcourses");
  return {
    type: FIND_ENROLLEDCOURSES,
    payload: request
  };
};

const toggleEnrollStudent = props => {
  const request = axios.put(ROOT_URL + "/enrolledcoursetoggle/", props);
  return {
    type: ENROLL_STUDENT,
    payload: request
  };
};

const toggleCourseComplete = props => {
  const request = axios.put(ROOT_URL + "/enrolledcoursecomplete/", props);
  return {
    type: COURSE_COMPLETE,
    payload: request
  };
};

exports.fetchSummary = fetchSummary;
exports.signinUser = signinUser;
exports.signoutUser = signoutUser;
exports.authError = authError;
exports.fetchChat = fetchChat;
exports.createChat = createChat;
exports.fetchRanges = fetchRanges;
exports.fetchGoLives = fetchGoLives;
exports.fetchHistory = fetchHistory;
exports.fetchHistoryDay = fetchHistoryDay;
exports.fetchKudos = fetchKudos;
exports.fetchNews = fetchNews;
exports.fetchNewsItem = fetchNewsItem;
exports.createNews = createNews;
exports.updateNews = updateNews;
exports.fetchAlerts = fetchAlerts;
exports.fetchAlertItem = fetchAlertItem;
exports.createAlert = createAlert;
exports.updateAlerts = updateAlerts;
exports.deleteAlert = deleteAlert;
exports.deleteNews = deleteNews;
exports.fetchCourses = fetchCourses;
exports.createCourse = createCourse;
exports.fetchCourse = fetchCourse;
exports.updateCourse = updateCourse;
exports.fetchAccounts = fetchAccounts;
exports.findStudents = findStudents;
exports.findAllEnrolledCourses = findAllEnrolledCourses;
exports.toggleEnrollStudent = toggleEnrollStudent;
exports.toggleCourseComplete = toggleCourseComplete;
