import {FETCH_ACCOUNTS} from '../actions';

const INITIAL_STATE = { accounts: []};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {

		case FETCH_ACCOUNTS:
			return {...state, accounts: action.payload.data};
		default:
			return state;
	}
};