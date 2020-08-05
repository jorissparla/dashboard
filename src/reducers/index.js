import { combineReducers } from "redux";
import SummaryReducer from "./reducer_summary";
import AlertsReducer from "./reducer_alerts";
import CourseReducer from "./reducer_courses";
import AccountReducer from "./reducer_accounts";
import { reducer as formReducer } from "redux-form";

//import { ApolloClient, createNetworkInterface } from "@apollo/client";
import authReducer from "./auth_reducer";

const rootReducer = combineReducers({
  summary: SummaryReducer,
  alerts: AlertsReducer,
  form: formReducer,
  auth: authReducer,
  courses: CourseReducer,
  main: AccountReducer,
  //apollo: client.reducer()
});

export default rootReducer;
