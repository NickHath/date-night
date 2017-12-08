import axios from 'axios';
import categories from './categories';

const initialState = {
  results: {},
  preferences: {},
  categories: categories,
  pending: 0
}

const GET_RESULTS = 'GET_RESULTS'
    , ADD_PREFERENCES = 'ADD_PREFERENCES';

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_RESULTS + '_PENDING':
      return Object.assign({}, state, { pending: ++state.pending });
    case GET_RESULTS + '_FULFILLED':
      return Object.assign({}, state, { results: Object.assign({}, state.results, action.payload), pending: --state.pending });
    case ADD_PREFERENCES:
      return Object.assign({}, state, { preferences: action.payload })
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