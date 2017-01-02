import { combineReducers } from 'redux';
import SummaryReducer from './reducer_summary';
import AlertsReducer from './reducer_alerts';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  summary: SummaryReducer,
  alerts: AlertsReducer,
  form: formReducer,
  auth: authReducer

});

export default rootReducer;
