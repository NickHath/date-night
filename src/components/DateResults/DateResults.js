import React, { Component } from 'react';
import axios from 'axios';

// components
import Date from './Date';
import MobileHeader from './MobileHeader';
import DateCard from './DateCard';

// redux
import { connect } from 'react-redux';
import { getResults, clearResults } from '../../ducks/reducer';

class DateResults extends Component {
  componentDidMount() {
    this.findBusinesses();
  }

  findBusinesses() {
    // clear businesses off store
    this.props.clearResults();
    let { location, radius, duration, startTime } = this.props.preferences;
    let categories = this.getCategories(startTime, duration);
    console.log(`random category within ${radius} meters of ${location}\n${duration} date at ${startTime}: `, categories);

    // cycle through categories
    if (Array.isArray(categories)) {
      for(let i = 0; i < categories.length; i++ ){
        this.props.getResults(location, categories[i]);
      }
    }
  }

  // selects appropriate number of random categories for startime and duration
  getCategories(startTime, duration) {
    let categories = [];
    let times = {'short': 1, 'medium': 2, 'long': 3}
    for (let i = times[duration]; i > 0; i--) {
      categories.push(this.randomCategory(startTime));
      startTime += 200;
    }
    return categories;
  }

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
    console.log('PROPS:', this.props);
    const displayResults = this.props.results.map(results => {
      if (results.length === 0) {
        return <div><h2>No results found for this category</h2></div>;
      } else {
        let randIndex = Math.floor(Math.random() * results.length);
      return (
        <div>
          
          <a target="_blank" href={ results[randIndex].url }>{results[randIndex].name}</a>
          {results[randIndex].categories.map(category => <h2>{category.alias}
          </h2>)}
        </div>
    );
      }
    })
    return (
      <div className='date-results'>
        <h1>All results from our date search</h1>
        {/* render several date components here */}
        <button onClick={ () => this.findBusinesses() }>Give me some dates!!!</button>
      { displayResults }
      <MobileHeader />
      <DateCard />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    results: state.results, 
    categories: state.categories ,
    preferences: state.preferences,
  };
}

export default connect(mapStateToProps, { getResults, clearResults })(DateResults);