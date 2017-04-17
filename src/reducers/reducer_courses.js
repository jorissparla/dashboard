import { FETCH_COURSES } from '../actions/index';
const INITIAL_STATE = {
  courses: []
};

const CourseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COURSES:
      return {
        ...state,
        courses: action.payload.data
      }

    default:
      return state;
  }
}

export default CourseReducer;