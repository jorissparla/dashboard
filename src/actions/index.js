import axios from 'axios';
export const FETCH_SUMMARY = 'FETCH_SUMMARY';

const ROOT_URL = 'http://localhost:3000'

const fetchSummary = () => {
    const request = axios.get(ROOT_URL+'/api/summary')
      return {
    type : FETCH_SUMMARY,
    payload: request
  };
}

export default fetchSummary;
