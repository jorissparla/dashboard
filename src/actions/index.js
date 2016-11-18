import axios from 'axios';
export const FETCH_SUMMARY = 'FETCH_SUMMARY';
export const FETCH_NEWS = 'FETCH_NEWS';

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

exports.fetchSummary = fetchSummary;
exports.fetchNews = fetchNews;
