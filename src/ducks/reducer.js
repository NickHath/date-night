import axios from 'axios';

const initialState = {
  businesses: []
}

const GET_BUSINESSES = 'GET_BUSINESSES';

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_BUSINESSES + '_FULFILLED': 
      return Object.assign({}, state, { businesses: action.payload });
    default:
      return state;
  } 
}

export function getBusinesses() {
  const businesses = axios.get('http://localhost:4200/api/yelp').then(res => res.data);
  return {
    type: GET_BUSINESSES,
    payload: businesses
  }
}