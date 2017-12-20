import axios from 'axios';
import categories from './categories';

const initialState = {
  results: {},
  preferences: {},
  categories: categories,
  pending: 0,
  finalDate: [],
  sharingId: '',
  filters: { 'cheap': false, 'sober': false, 'sedentary': false },
  popularDates: [],
  hotAndNew: []
}

const GET_RESULTS = 'GET_RESULTS'
    , ADD_PREFERENCES = 'ADD_PREFERENCES'
    , FINALIZE_DATE = 'FINALIZE_DATE'
    , ADD_SHARING_ID = 'ADD_SHARING_ID'
    , TOGGLE_FILTER = 'TOGGLE_FILTER'
    , GET_POPULAR_DATES = 'GET_POPULAR_DATES'
    , ADD_HOT_AND_NEW ='ADD_HOT_AND_NEW';

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_RESULTS + '_PENDING':
      return Object.assign({}, state, { pending: ++state.pending });
    case GET_RESULTS + '_FULFILLED':
      let results = Object.values(action.payload)[0];
      if (results.length === 0) {
        return Object.assign({}, state, { pending: --state.pending });
      } else {
        return Object.assign({}, state, { results: Object.assign({}, state.results, action.payload), pending: --state.pending });
      }
    case ADD_PREFERENCES:
      return Object.assign({}, state, { preferences: action.payload });
    case FINALIZE_DATE:
      return Object.assign({}, state, { finalDate: action.payload });
    case ADD_SHARING_ID:
      return Object.assign({}, state, { sharingId: action.payload });
    case TOGGLE_FILTER:
      let filters = {...state.filters};
      filters[action.payload] = !filters[action.payload];
      return Object.assign({}, state, { filters });
    case GET_POPULAR_DATES + '_FULFILLED': 
      return Object.assign({}, state, { popularDates: action.payload });
    case ADD_HOT_AND_NEW: 
      return Object.assign({}, state, { hotAndNew: action.payload });
    default:
      return state;
  } 
}

export function getResults(location, category, radius) {
  const results = axios.post('http://localhost:4200/api/yelp', { location, category, radius })
                       .then(res => {
                         let results = {};
                         results[category] = res.data;
                         return results
                        });
  
  return {
    type: GET_RESULTS,
    payload: results,
  }
}

export function addPreferences(preferences) {
  return {
    type: ADD_PREFERENCES,
    payload: preferences,
  }
}

export function finalizeDate(date) {
  return {
    type: FINALIZE_DATE,
    payload: date
  }
}

export function addSharingId(id) {
  return {
    type: ADD_SHARING_ID,
    payload: id
  }
}

export function activateFilter(filter) {
  return {
    type: TOGGLE_FILTER,
    payload: filter
  }
}

export function getPopularDates(location) {
  const results = axios.get(`http://localhost:4200/api/getAllDates/${location}`)
                       .then(res => res.data);
  return {
    type: GET_POPULAR_DATES,
    payload: results
  }
}

export function addHotAndNew(locations) {
  return {
    type: ADD_HOT_AND_NEW,
    payload: locations
  }
}