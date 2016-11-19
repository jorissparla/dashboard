import { combineReducers } from 'redux';
import SummaryReducer from './reducer_summary';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  summary: SummaryReducer,
  form: formReducer
});

export default rootReducer;
