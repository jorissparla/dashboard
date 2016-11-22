import { combineReducers } from 'redux';
import SummaryReducer from './reducer_summary';
import AlertsReducer from './reducer_alerts';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  summary: SummaryReducer,
  alerts: AlertsReducer,
  form: formReducer
});

export default rootReducer;
