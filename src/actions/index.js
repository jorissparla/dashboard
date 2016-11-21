import axios from 'axios';
export const FETCH_SUMMARY = 'FETCH_SUMMARY';
export const FETCH_NEWS = 'FETCH_NEWS';
export const SHOW_NEWS = 'SHOW_NEWS';
export const CREATE_NEWS = 'CREATE_NEWS';
export const UPDATE_NEWS = 'UPDATE_NEWS';
export const DELETE_NEWS = 'DELETE_NEWS';
export const FETCH_KUDOS = 'FETCH_KUDOS'
export const FETCH_ALERTS ='FETCH_ALERTS';
export const CREATE_ALERTS ='CREATE_ALERTS';
export const UPDATE_ALERTS ='UPDATE_ALERTS';

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

const fetchNewsItem = (id) => {
    const request = axios.get(ROOT_URL+'/news/'+id)
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
  const request= axios.post(ROOT_URL+'/news/update', props);
  return {
    type: UPDATE_NEWS,
    payload: request
  }
}

const fetchKudos = () => {
    const request = axios.get(ROOT_URL+'/kudos')
      return {
    type : FETCH_KUDOS,
    payload: request
  };
}

const fetchAlerts = () => {
    const request = axios.get(ROOT_URL+'/alerts')
      return {
    type : FETCH_ALERTS,
    payload: request
  };
}

const fetchAlertsItem = (id) => {
    const request = axios.get(ROOT_URL+'/alerts/'+id)
      return {
    type : FETCH_ALERTS,
    payload: request
  };
}


const createAlerts =(props) => {
  const request= axios.put(ROOT_URL+'/alerts', props);
  return {
    type: CREATE_ALERTS,
    payload: request
  }
}

const updateAlerts =(props) => {
  const request= axios.post(ROOT_URL+'/alerts/update', props);
  return {
    type: UPDATE_ALERTS,
    payload: request
  }
}


exports.fetchSummary = fetchSummary;
exports.fetchKudos = fetchKudos;
exports.fetchNews = fetchNews;
exports.fetchNewsItem = fetchNewsItem;
exports.createNews = createNews;
exports.updateNews = updateNews;
exports.fetchAlerts = fetchAlerts;
exports.fetchAlertsItem = fetchAlertsItem;
exports.createAlerts = createAlerts;
exports.updateAlerts = updateAlerts;

