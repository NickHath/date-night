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
    let location = 'provo', radius = 12000, startTime = 800, duration = 'short';
    let categories = this.randomCategories(startTime, duration);
    console.log('morningCategories: ', categories);

    startTime = 2100, duration='long';
    categories = this.randomCategories(startTime, duration);
    console.log('nightCategories: ', categories);
    

    if (Array.isArray(categories)) {
      for (let i = 0; i < categories.length; i++) {
        this.props.getBusinesses(location, categories[i]);
      }
    }
  }

  // needs to handle empty responses, multiple businesses for a longer date
  // and time changes (i.e., two locations in the morning and one in the afternoon)
  // update time based on the duration of date location
  randomCategories(startTime, duration) {
    let categories = [], time = '';

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
    categories.push(mainCategories[randIndex])
    return categories;
  }

  render() {
    console.log(this.props);
    return (
      <div className='date-results'>
        <h1>All results from our date search</h1>
        // render several date components here
        { JSON.stringify(this.props.businesses) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { businesses: state.businesses, categories: state.categories };
}

export default connect(mapStateToProps, { getBusinesses })(DateResults);