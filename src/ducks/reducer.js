import axios from 'axios';
import categories from './categories';

const initialState = {
  businesses: [],
  categories: categories
}

const GET_BUSINESSES = 'GET_BUSINESSES';

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_BUSINESSES + '_FULFILLED': 
      return Object.assign({}, state, { businesses: [...state.businesses, action.payload] });
    default:
      return state;
  } 
}

export function getBusinesses(location, category, radius) {
  const businesses = axios.post('http://localhost:4200/api/yelp', { location, category, radius })
                          .then(res => res.data);
  return {
    type: GET_BUSINESSES,
    payload: businesses
  }
}