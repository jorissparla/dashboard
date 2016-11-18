import { combineReducers } from 'redux';
import SummaryReducer from './reducer_summary';

const rootReducer = combineReducers({
  summaries: SummaryReducer
});

export default rootReducer;
