import axios from 'axios';
import categories from './categories';

const initialState = {
  results: [],
  preferences: [],
  categories: categories
}

const GET_RESULTS = 'GET_RESULTS'
    , CLEAR_RESULTS = 'CLEAR_RESULTS'
    , ADD_PREFERENCES = 'ADD_PREFERENCES';

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_RESULTS + '_FULFILLED': 
      return Object.assign({}, state, { results: [...state.results, action.payload] });
    case CLEAR_RESULTS:
      return Object.assign({}, state, { results: [] })
    case ADD_PREFERENCES:
      return Object.assign({}, state, { preferences: [action.payload]})
    default:
      return state;
  } 
}

export function getResults(location, category, radius) {
  const results = axios.post('http://localhost:4200/api/yelp', { location, category, radius })
                          .then(res => res.data);
  return {
    type: GET_RESULTS,
    payload: results
  }
}

export function clearResults() {
  return {
    type: CLEAR_RESULTS
  }
}

export function addPreferences(preferences){
  return {
    type: ADD_PREFERENCES,
    payload: preferences
  }
}


