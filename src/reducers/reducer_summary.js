import {FETCH_SUMMARY, FETCH_NEWS} from '../actions/index';
const INITIAL_STATE = { summary:[], news:[],all: [], post:null };

const SummaryReducer =   ( state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_SUMMARY:
            return {...state, summary: action.payload.data}
        case FETCH_NEWS:
            return {...state, news: action.payload.data}
        default:
            return state;
    }
}

export default SummaryReducer;