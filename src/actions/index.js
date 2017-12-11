import axios from "axios";

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
export const SHOW_ALERTS = "SHOW_ALERTS";
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

const {
  REACT_APP_PORT1_REST = 3001,
  REACT_APP_PORT_GRAPHQL = 55555,
  REACT_APP_SERVER = "nlbavwixs"
} = process.env;

export const ROOT_URL = `http://${REACT_APP_SERVER}:${REACT_APP_PORT1_REST}/api`;
//export const ROOT_URL = "http://localhost:3001/api";

export const authError = error => {
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

export const signinUser = async ({ email, password }) => {
  return async dispatch => {
    let err, response;
    [err, response] = await to(axios.post(`${ROOT_URL}/signin`, { email, password }));
    if (err) {
      dispatch(authError("Bad Login Info"));
      return { error: "Bad Login Info" };
    }
    if (response) {
      console.log("response.data.user", response.data.user);
      localStorage.setItem("id", response.data.uic);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", email);
      localStorage.setItem("name", response.data.user.fullname);
      localStorage.setItem("picture", response.data.user.pic);
      localStorage.setItem("role", response.data.user.role);
      dispatch({ type: AUTH_USER, user: response.data.user });
      return { error: "" };
      //browserHistory.push("/");
    }
  };
};

export const forgotPassword = async email => {
  await axios.post(`${ROOT_URL}/forgot`, { email });
  return { type: AUTH_FORGOT };
};

export const UpdatePassword = async ({ password, token }) => {
  await axios.post(`${ROOT_URL}/updatemypassword`, {
    password,
    token
  });

  return { type: AUTH_PASS };
};

export const signoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  localStorage.removeItem("id");
  localStorage.setItem("email", "");
  localStorage.setItem("picture", "");

  return { type: UNAUTH_USER };
};

export const fetchAccounts = () => {
  const request = axios.get(ROOT_URL + "/accounts");
  return {
    type: FETCH_ACCOUNTS,
    payload: request
  };
};

export const fetchSummary = (region = "EMEA") => {
  const request = axios.get(`${ROOT_URL}/summary/${region}`);
  return {
    type: FETCH_SUMMARY,
    payload: request
  };
};

export const fetchChat = () => {
  const request = axios.get(ROOT_URL + "/chat");
  return {
    type: FETCH_CHAT,
    payload: request
  };
};

export const createChat = chatData => {
  const request = axios.put(ROOT_URL + "/chat", chatData);
  return {
    type: CREATE_CHAT,
    payload: request
  };
};

export const fetchRanges = () => {
  const request = axios.get(ROOT_URL + "/ranges");
  return {
    type: FETCH_RANGES,
    payload: request
  };
};

export const fetchGoLives = () => {
  const request = axios.get(ROOT_URL + "/golives");
  return {
    type: FETCH_GOLIVES,
    payload: request
  };
};

export const fetchHistory = () => {
  const request = axios.get(ROOT_URL + "/history");
  return {
    type: FETCH_HISTORY,
    payload: request
  };
};

export const fetchHistoryDay = () => {
  const request = axios.get(ROOT_URL + "/historyday");
  return {
    type: FETCH_HISTORY_DAY,
    payload: request
  };
};
export const fetchNews = () => {
  const request = axios.get(ROOT_URL + "/news");
  return {
    type: FETCH_NEWS,
    payload: request
  };
};

export const fetchNewsItem = id => {
  const request = axios.get(ROOT_URL + "/news/" + id);
  return {
    type: FETCH_NEWS_ITEM,
    payload: request
  };
};

export const createNews = props => {
  const request = axios.put(ROOT_URL + "/news", props);
  return {
    type: CREATE_NEWS,
    payload: request
  };
};

export const updateNews = props => {
  const request = axios.post(ROOT_URL + "/news/update", props);
  return {
    type: UPDATE_NEWS,
    payload: request
  };
};

export const fetchKudos = () => {
  const request = axios.get(ROOT_URL + "/kudos");
  return {
    type: FETCH_KUDOS,
    payload: request
  };
};

export const fetchAlerts = () => {
  const request = axios.get(ROOT_URL + "/alerts");
  return {
    type: FETCH_ALERTS,
    payload: request
  };
};

export const fetchAlertItem = id => {
  const request = axios.get(ROOT_URL + "/alerts/" + id);
  return {
    type: FETCH_ALERTS,
    payload: request
  };
};

export const createAlert = props => {
  const request = axios.put(ROOT_URL + "/alerts", props);
  return {
    type: CREATE_ALERTS,
    payload: request
  };
};

export const updateAlerts = props => {
  const request = axios.post(ROOT_URL + "/alerts/update", props);
  return {
    type: UPDATE_ALERTS,
    payload: request
  };
};

export const deleteAlert = id => {
  const request = axios.delete(ROOT_URL + "/alerts/" + id);
  return {
    type: DELETE_ALERT,
    payload: request
  };
};
export const deleteNews = id => {
  const request = axios.delete(ROOT_URL + "/news/" + id);
  return {
    type: DELETE_NEWS,
    payload: request
  };
};

export const fetchCourses = () => {
  const request = axios.get(ROOT_URL + "/courses/");
  return {
    type: FETCH_COURSES,
    payload: request
  };
};

export const createCourse = props => {
  const request = axios.put(ROOT_URL + "/courses/", props);
  return {
    type: CREATE_COURSE,
    payload: request
  };
};

export const updateCourse = props => {
  const request = axios.post(ROOT_URL + "/courses/", props);
  return {
    type: UPDATE_COURSE,
    payload: request
  };
};

export const fetchCourse = id => {
  const request = axios.get(ROOT_URL + "/courses/" + id);
  return {
    type: FETCH_COURSE,
    payload: request
  };
};

export const findStudents = id => {
  const request = axios.get(ROOT_URL + "/findStudents/" + id);
  return {
    type: FIND_STUDENTS,
    payload: request
  };
};

export const findAllEnrolledCourses = () => {
  const request = axios.get(ROOT_URL + "/listenrolledcourses");
  return {
    type: FIND_ENROLLEDCOURSES,
    payload: request
  };
};

export const toggleEnrollStudent = props => {
  const request = axios.put(ROOT_URL + "/enrolledcoursetoggle/", props);
  return {
    type: ENROLL_STUDENT,
    payload: request
  };
};

export const toggleCourseComplete = props => {
  const request = axios.put(ROOT_URL + "/enrolledcoursecomplete/", props);
  return {
    type: COURSE_COMPLETE,
    payload: request
  };
};
