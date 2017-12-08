import axios from 'axios';
import categories from './categories';

const initialState = {
  results: {},
  preferences: {},
  categories: categories,
}

const GET_RESULTS = 'GET_RESULTS'
    , ADD_PREFERENCES = 'ADD_PREFERENCES';

export default function reducer(state = initialState, action) {
  console.log(state);
  switch(action.type) {
    case GET_RESULTS + '_PENDING':
      console.log('GET_RESULTS_PENDING:', action);
      return state;
    case GET_RESULTS + '_FULFILLED':
      // let newResults = {};
      // newResults[action.category] = action.payload;
      console.log('GET_RESULTS_FULFILLED:', action);
      return state;
    case ADD_PREFERENCES:
      return Object.assign({}, state, { preferences: action.payload })
    default:
      return state;
  } 
}

export function getResults(location, category, radius) {
  console.log('GET RESULTS', location, category, radius);
  const results = axios.post('http://localhost:4200/api/yelp', { location, category, radius })
                       .then(res => res.data);
  
  return {
    type: GET_RESULTS,
    payload: results,
    category: category,
  }
}

export function addPreferences(preferences) {
  return {
    type: ADD_PREFERENCES,
    payload: preferences,
  }
}