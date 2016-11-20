import {FETCH_SUMMARY, FETCH_NEWS, SHOW_NEWS, DELETE_NEWS, FETCH_KUDOS} from '../actions/index';
const INITIAL_STATE = { summary:[], news:[],all: [], post:null };

const SummaryReducer =   ( state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_SUMMARY:
            return {...state, summary: action.payload.data}
        case FETCH_NEWS:
            return {...state, news: action.payload.data}
        case FETCH_KUDOS:
            return {...state, kudos: action.payload.data}
        case SHOW_NEWS:
            return {...state, news: action.payload.data}
        default:
            return state;
    }
}

export default SummaryReducer;