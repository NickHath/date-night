import React, { Component } from 'react';
import axios from 'axios';

// components
import Date from './Date';

// redux
import { connect } from 'react-redux';
import { getResults } from '../../ducks/reducer';

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

  // initializes state (which sets off the first randomizer method)
  componentDidMount() {
    this.initState();
    // FRONTLOAD MAIN CATEGORIES
    let allCategories = this.props.categories.day.concat(this.props.categories.night);
    allCategories.forEach(category => {
      this.props.getResults(this.props.preferences.location, category, this.props.preferences.radius);
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pending === 0) {
      this.state.lockedBusinesses.forEach((locked, index) => {
        if (!locked && this.props.results[this.state.categories[index]]) {
          let randIndex = Math.floor(Math.random() * this.props.results[this.state.categories[index]].length)
          this.state.businesses[index] = this.props.results[this.state.categories[index]][randIndex];
        }
      })
    }
  }

  // sets state to appropriate length for all 4 arrays
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

  // this function sets off all the callback methods to update state
  // called in initState and whenever they press the refresh button
  refreshDate() {
    this.getRandomCategories(this.props.preferences.startTime);    
  }

  // using categories on state, retrieve a random business for each non-locked business on state
  updateBusinesses() {
    console.log('UPDATE BUSINESSES WITH ', this.state.categories)
    let { location, radius } = this.props.preferences;
    let { categories } = this.state;
    let returnedBusinesses = [], newBusinesses = [...this.state.businesses];
    // if category is locked, we might need to hit the yelp api (because it is a specific cat not initialized)
    this.state.lockedBusinesses.forEach((locked, index) => {
      if (!locked && !this.props.results[categories[index]]) {
        this.props.getResults(location, categories[index], radius);
        // randomize business from componentwillreceiveprops
      } else if(!locked && this.props.results[categories[index]]) {
        // randomize business from function
        let randIndex = Math.floor(Math.random() * this.props.results[this.state.categories[index]].length)
        newBusinesses[index] = this.props.results[this.state.categories[index]][randIndex];
      }
    });
    this.setState({ businesses: newBusinesses });
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
      this.updateBusinesses();
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

  // given an index, updates lockedBusinesses at that index
  lockBusiness(index) {
    let lockedBusinesses = [...this.state.lockedBusinesses];
    lockedBusinesses[index] = !lockedBusinesses[index];
    this.setState({ lockedBusinesses });
  }

  // given an index and a subcategory, update categories AND lockedCategories
  // at that index
  lockCategory(index, newCategory) {
    let lockedCategories = [...this.state.lockedCategories];
    let categories = [...this.state.categories];
    lockedCategories[index] = !lockedCategories[index];
    if (lockedCategories[index]) { categories[index] = newCategory };
    this.setState({ lockedCategories, categories });
  }

  render() {
    console.log('STATE:', this.state);
    console.log('PROPS:', this.props);
    let displayBusinesses = this.state.businesses.map((business, index) => {
      if (business !== null) {
        return (
          <div>
            <button onClick={ () => this.lockBusiness(index) }>Lock Business #{ index + 1 }</button>
            <button onClick={ () => this.lockCategory(index, business.categories[0].alias) }>Lock Category #{ index + 1 }</button><br/>
            <a target="_blank" href={business.url}>
              <h1>{ business.name }</h1>
              <h2>{ JSON.stringify(business.categories) }</h2>
              <img style={ {"width": "100px", "height":"100px"} }src={ business.image_url } alt="No image found"/>
            </a>
            <br/>
          </div>
        )
      }
    })

    return (
      <div className='date-results'>
        <h1>All results from our date search</h1>
        {/* render several date components here */}
        <button onClick={ () => this.refreshDate() }>Give me some dates!!!</button><br/><br/><br/>
        { displayBusinesses } 
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getResults })(DateResults);