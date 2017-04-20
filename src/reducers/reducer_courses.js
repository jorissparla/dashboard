import { FETCH_COURSES, FETCH_COURSE, FIND_STUDENTS, FIND_ENROLLEDCOURSES } from '../actions/index';
const INITIAL_STATE = {
  courses: [], students: [], course: {}, enrolled: []
};

const CourseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COURSES:
      return {
        ...state,
        courses: action.payload.data
      }
    case FETCH_COURSE:
      return {
        ...state,
        course: action.payload.data[0]
      }
    case FIND_STUDENTS:
      return {
        ...state,
        students: action.payload.data
      }
    case FIND_ENROLLEDCOURSES:
      return {
        ...state,
        enrolled: action.payload.data
      }

    default:
      return state;
  }
}

export default CourseReducer;