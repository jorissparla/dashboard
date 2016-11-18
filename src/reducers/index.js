import { combineReducers } from 'redux';
import SummaryReducer from './reducer_summary';

const rootReducer = combineReducers({
  summary: SummaryReducer
});

export default rootReducer;
