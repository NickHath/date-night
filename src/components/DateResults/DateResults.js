import React, { Component } from 'react';
import axios from 'axios';

// components
import Date from './Date';

// redux
import { connect } from 'react-redux';
import { getResults, clearResults } from '../../ducks/reducer';

class DateResults extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      lockedCategories: [],
      businesses: [],
      lockedBusinesses: []
    }
  }

  componentDidMount() {
    this.initState();
  }

  initState() {
    let durations = { 'short': 1, 'medium': 2, 'long': 3 };
    let locked = [], businesses = [], categories = [];
    for (let i = durations[this.props.preferences.duration]; i > 0; i--) {
      locked.push(false);
      categories.push('');
      businesses.push(null);
    }
    this.setState({ categories, businesses, lockedCategories: locked, lockedBusinesses: locked }, () => {
      this.refreshDate();
    });
  }

  refreshDate() {
    let { location, radius, duration, startTime } = this.props.preferences;
    this.getRandomCategories(this.props.preferences.startTime);    
  }

  findBusinesses() {
    let newBusinesses = [];
    this.state.lockedBusinesses.forEach((locked, index) => {
      let location = this.props.preferences.location;
      let currCategory = this.state.categories[index];
      if (!locked) {
        if (Object.keys(this.props.results).includes(currCategory)) {

        } else {
          this.props.getResults(location, currCategory);
        }
        console.log('find new business with' + this.state.categories[index]);

      }
    })
  }

  randomBusiness(businesses) {
    let randIndex = Math.floor(Math.random() * businesses.length)
    return businesses[randIndex];
  }

  // selects appropriate number of random categories for startime
  getRandomCategories(startTime) {
    let newCategories = [...this.state.categories];

    // only get a random category when category at that index is not locked
    this.state.lockedCategories.forEach((locked, index) => {
      if (!locked) {
        newCategories[index] = this.randomCategory(startTime);
      }
      startTime += 200;         
    });

    // after updateing categories, get new business with those keywords
    this.setState({ categories: newCategories }, () => {
      this.findBusinesses();
    });
  }

  // return one random category given a start time
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

  lockBusiness(index) {
    let lockedBusinesses = [...this.state.businesses];
    lockedBusinesses[index] = true;
    this.setState({ lockedBusinesses });
  }

  // given an index and a subcategory, update state
  lockCategory(index, newCategory) {
    let lockedCategories = [...this.state.lockedCategories];
    let categories = [...this.state.categories];

    lockedCategories[index] = true;
    categories[index] = newCategory;

    this.setState({ lockedCategories, categories });
  }

  render() {
    // const displayResults = this.props.results.map(results => {
    //   if (results.length === 0) {
    //     return <div><h2>No results found for this category</h2></div>;
    //   } else {
    //     let randIndex = Math.floor(Math.random() * results.length);
    //   return (
    //     <div>
          
    //       <a target="_blank" href={ results[randIndex].url }>{results[randIndex].name}</a>
    //       {results[randIndex].categories.map(category => <h2>{category.alias}
    //       </h2>)}
    //     </div>
    // );
    //   }
    // })
    console.log('STATE:', this.state);
    return (
      <div className='date-results'>
        <h1>All results from our date search</h1>
        {/* render several date components here */}
        <button onClick={ () => this.refreshDate() }>Give me some dates!!!</button>
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