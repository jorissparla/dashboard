import {FETCH_SUMMARY, FETCH_CHAT, FETCH_RANGES, FETCH_HISTORY, FETCH_NEWS, SHOW_NEWS, FETCH_KUDOS, FETCH_GOLIVES} from '../actions/index'
const INITIAL_STATE = { summary: [], news: [], all: [], history: [], post: null }

const SummaryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SUMMARY:
      return {...state, summary: action.payload.data}
    case FETCH_CHAT:
      return {...state, chat: action.payload.data}
    case FETCH_RANGES:
      return {...state, ranges: action.payload.data}
    case FETCH_GOLIVES:
      return {...state, golives: action.payload.data}
    case FETCH_HISTORY:
      return {...state, history: action.payload.data}
    case FETCH_NEWS:
      return {...state, news: action.payload.data}
    case FETCH_KUDOS:
      return {...state, kudos: action.payload.data}
    case SHOW_NEWS:
      return {...state, news: action.payload.data}
    default:
      return state
  }
}

export default SummaryReducer
