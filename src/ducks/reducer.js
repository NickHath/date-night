import axios from 'axios';
import categories from './categories';

const initialState = {
  results: {},
  preferences: {},
  categories: categories,
  pending: 0,
  finalDate: []
}

const GET_RESULTS = 'GET_RESULTS'
    , ADD_PREFERENCES = 'ADD_PREFERENCES'
    , FINALIZE_DATE = 'FINALIZE_DATE';

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_RESULTS + '_PENDING':
      return Object.assign({}, state, { pending: ++state.pending });
    case GET_RESULTS + '_FULFILLED':
    console.log('HERE',action.payload);
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
    default:
      return state;
  } 
}

export function getResults(location, category, radius) {
  const results = axios.post('api/yelp', { location, category, radius })
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