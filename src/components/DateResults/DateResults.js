import React, { Component } from 'react';
import axios from 'axios';

// components
import Date from './Date';

// redux
import { connect } from 'react-redux';
import { getBusinesses} from '../../ducks/reducer';

class DateResults extends Component {
  componentDidMount() {
    // gets their location/radius from either the store or props
    // and the category comes from a random search based on their
    // input (start time, duration)
    
    // these should come from landing page input fields!!!
    this.getDates();
  }

  getDates() {

    console.log( this.props.preferences[0])
    if(this.props.preferences[0]){
    let {location, radius, duration, startTime} = this.props.preferences[0]
    
    let categories = this.getCategories(startTime, duration);
    console.log(`random category within ${radius} meters of ${location}\n${duration} date at ${startTime}: `, categories);
    if (Array.isArray(categories)) {
      for (let i = 0; i < categories.length; i++) {
        this.props.getBusinesses(location, categories[i]);
      }
    }
  }
}
  // selects appropriate number of random categories for startime and duration
  getCategories(startTime, duration) {
    let categories = [];
    let times = {'short': 1, 'medium': 2, 'long': 3}
    for (let i = times[duration]; i > 0; i--) {
      categories.push(this.randomCategory(startTime));
      startTime += 130;
    }
    return categories;
  }

  // needs to handle empty responses, multiple businesses for a longer date
  // and time changes (i.e., two locations in the morning and one in the afternoon)
  // update time based on the duration of date location
  randomCategory(startTime) {
    let time = '';
    // set time to the correct key for categories object
    if (630 < startTime && startTime < 1800) {
      time = 'day';
    } else {
      time = 'night';
    }

    // push a random category string to the categories array
    let mainCategories = this.props.categories[time];
    let randIndex = Math.floor(Math.random() * mainCategories.length)
    return mainCategories[randIndex];
  }

  render() {
    console.log(this.props);
    const displayBusinesses = this.props.businesses.map(business => {
      if (business.length === 0) {
        return <div><h2>No business found for this category</h2></div>;
      } else {
        let randIndex = Math.floor(Math.random() * business.length);
      return (
        <div>
          <a target="_blank" href={ business[randIndex].url }>{business[randIndex].name}</a>
          {business[randIndex].categories.map(category => <h2>{category.alias}</h2>)}
        </div>
    );
      }
    })
    return (
      <div className='date-results'>
        <h1>All results from our date search</h1>
        {/* render several date components here */}
        <button onClick={ () => this.getDates() }>Give me some dates!!!</button>
        { displayBusinesses }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    businesses: state.businesses, 
    categories: state.categories ,
    preferences: state.preferences,
  };
}

export default connect(mapStateToProps, { getBusinesses })(DateResults);