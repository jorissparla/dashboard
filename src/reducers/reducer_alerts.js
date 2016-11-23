import { FETCH_ALERTS, SHOW_ALERTS} from '../actions/index';
const INITIAL_STATE = { alerts:[],all: [], alert:null };

const AlertsReducer =   ( state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALERTS:
            return {...state, alerts: action.payload.data}

        case SHOW_ALERTS:
            return {...state, alerts: action.payload.data}
        default:
            return state;
    }
}

export default AlertsReducer;