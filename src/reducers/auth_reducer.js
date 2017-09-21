import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  AUTH_FORGOT,
  FETCH_MESSAGE
} from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: "", authenticated: true, user: action.user };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_FORGOT:
      return { ...state, error: action.payload };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
