import axios from 'axios';
export const FETCH_SUMMARY = 'FETCH_SUMMARY';
export const FETCH_NEWS = 'FETCH_NEWS';
export const CREATE_NEWS = 'CREATE_NEWS';
export const UPDATE_NEWS = 'UPDATE_NEWS';

const ROOT_URL = 'http://localhost:3000/api'

const fetchSummary = () => {
    const request = axios.get(ROOT_URL+'/summary')
      return {
    type : FETCH_SUMMARY,
    payload: request
  };
}
const fetchNews = () => {
    const request = axios.get(ROOT_URL+'/news')
      return {
    type : FETCH_NEWS,
    payload: request
  };
}

const createNews =(props) => {
  const request= axios.put(ROOT_URL+'/news', props);
  return {
    type: CREATE_NEWS,
    payload: request
  }
}

const updateNews =(props) => {
  const request= axios.post(ROOT_URL+'/news/add', props);
  return {
    type: UPDATE_NEWS,
    payload: request
  }
}

exports.fetchSummary = fetchSummary;
exports.fetchNews = fetchNews;
exports.createNews = createNews;
exports.updateNews = updateNews;
