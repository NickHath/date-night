import React, { Component } from 'react';
import axios from 'axios';

// components
import Date from './Date';

// redux
import { connect } from 'react-redux';
import { getBusinesses } from '../../ducks/reducer';

class DateResults extends Component {
  componentDidMount() {
    // gets their location/radius from either the store or props
    // and the category comes from a random search based on their
    // input (start time, duration)
    
    // these should come from landing page input fields!!!
    let location = 'provo', radius = 12000, startTime = 1200, duration = 'long';
    let categories = this.getCategories(startTime, duration);
    console.log(`random category within ${radius} meters of ${location}\n${duration} date at ${startTime}: `, categories);
    if (Array.isArray(categories)) {
      for (let i = 0; i < categories.length; i++) {
        this.props.getBusinesses(location, categories[i]);
      }
    }
  }

  // selects appropriate number of random categories for startime and duration
  getCategories(startTime, duration) {
    let categories = [];
    let times = {'short': 150, 'medium': 300, 'long': 450}
    let combinations = {'short': [['short']], 'medium': [['medium'], ['short', 'short']], 'long': [['long'], ['medium', 'medium'], ['medium', 'short', 'short'], ['short', 'short', 'short']]}

    let randIndex = Math.floor(Math.random() * combinations[duration].length);
    let randCombination = combinations[duration][randIndex];
    // categories.push(this.randomCategory(startTime, duration));
    console.log(`duration ${duration}:`, randCombination)
    for (let i = 0; i < randCombination.length; i++) {
      categories.push(this.randomCategory(startTime, randCombination[i]));
      startTime += times[randCombination[i]];
    }
    return categories;
  }

  // needs to handle empty responses, multiple businesses for a longer date
  // and time changes (i.e., two locations in the morning and one in the afternoon)
  // update time based on the duration of date location
  randomCategory(startTime, duration) {
    let time = '';
    // set time to the correct key for categories object
    if (630 < startTime && startTime < 1200) {
      time = 'morning';
    } else if (1200 < startTime && startTime < 1600) {
      time = 'afternoon';
    } else if (1600 < startTime && startTime < 1930) {
      time = 'evening';
    } else {
      time = 'night';
    }
    // push a random category string to the categories array
    let mainCategories = this.props.categories[time][duration];
    let randIndex = Math.floor(Math.random() * mainCategories.length)
    return mainCategories[randIndex];
  }

  // displays random business objects for each array of businesses
  displayRandom() {

  }

  render() {
    console.log(this.props);
    const displayBusinesses = this.props.businesses.map(business => {
      if (business.length === 0) {
        return <div><h2>No business found for this category</h2></div>;
      } else {
        let randIndex = Math.floor(Math.random() * business.length);
        return <div><a target="_blank" href={ business[randIndex].url }>{business[randIndex].name}</a><br/></div>;
      }
    })
    return (
      <div className='date-results'>
        <h1>All results from our date search</h1>
        {/* render several date components here */}
        { displayBusinesses }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    businesses: state.businesses, 
    categories: state.categories 
  };
}

export default connect(mapStateToProps, { getBusinesses })(DateResults);