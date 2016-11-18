import FETCH_SUMMARY from '../actions/index';
const INITIAL_STATE = { all: [], summary:null };

const SummaryReducer =   ( state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_SUMMARY:
            return {...state, all: action.payload.data}
        default:
            return state;
    }
}

export default SummaryReducer;