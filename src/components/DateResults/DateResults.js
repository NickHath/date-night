import React, { Component } from 'react';
import axios from 'axios';
import mojs from 'mo-js';
import keymaster from 'keymaster';
import Shake from 'shake.js';

// components
import Date from './Date';
import MobileHeader from './MobileHeader';
import DateCard from './DateCard';
import SaveDate from './SaveDate';
import AddCard from './AddCard';
import Loading from './Loading'
import SideNav from './SideNav';
//materialUI
import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';
// redux
import { connect } from 'react-redux';
import { getResults, finalizeDate, addSharingId, addPreferences, activateFilter } from '../../ducks/reducer';
// SVGS
import DeleteCard from '../../assets/Delete.svg';
import Star from '../../assets/Star.svg';
import Clock from '../../assets/Start.svg';
import TestPic from '../../assets/Couple.png';
import Lock from '../../assets/Lock.svg';
import Arrow from '../../assets/Arrow.svg';
import logo from '../../assets/Icon.svg';
import IconBulb from '../../assets/Icon_White.svg';
import FilterBtn from '../../assets/Settings.svg';
import ShuffleBtn from '../../assets/Shuffle.svg';









// STATE EXPLAINED:
// businesses and categories are used for the current displayed date
// (they are arrays with length determined by preferences.duration)
// 
// lockedBusinesses and lockedCategories are used to determined whether or not
// we update the business or category with the same index (they are also arrays)
// 
// REFRESHDATE EXPLAINED:
// refreshDate => getRandomCategories => updateBusinesses
// uses callbacks because setState behaves asynchronously and we need
// to fully randomize categories before we can retrieve our new businesses

class DateResults extends Component {
  constructor(props) {
    super(props);

    // hit Yelp API to get results for all main categories 
    let allCategories = props.categories.day.concat(props.categories.night);
    allCategories.forEach(category => {
      props.getResults(props.preferences.location, category, props.preferences.radius)
    });

    // initalize state arrays using the duration preference for length
    let durations = { 'short': 1, 'medium': 2, 'long': 3 };
    let locked = [], businesses = [], categories = [];
    for (let i = durations[props.preferences.duration]; i > 0; i--) {
      locked.push(false);
      categories.push('');
      businesses.push(null);
    }

    this.state = {
      categories: [],
      lockedCategories: [],
      businesses: [],
      lockedBusinesses: [],
      isLoading: true
    }
    this.lockBusiness = this.lockBusiness.bind(this)
    this.lockCategory = this.lockCategory.bind(this)
    this.finalizeDate = this.finalizeDate.bind(this)
    this.refreshDate = this.refreshDate.bind(this);
    this.handleSpace = this.handleSpace.bind(this);
  }

  // runs the initial refreshDate after component renders
  componentDidMount() {
    // handle spacebar press
    keymaster('space', this.handleSpace);

    // handle phone shake
    var myShakeEvent = new Shake({
      threshold: 15, // optional shake strength threshold
      timeout: 1000 // optional, determines the frequency of event generation
    });
    myShakeEvent.start();
    window.addEventListener('shake', this.handleShake, false);

    // add parameter id to store if it exists
    if (this.props.match.params.id) {
      this.props.addSharingId(this.props.match.params.id);
    }

    axios.get(`/api/getDate/${this.props.match.params.id}`).then(res => {
      // set preferences to db date preferences if we have an id
      if (res.data.length > 0) {
        let { date_location, date_radius, day, start_time, duration } = res.data[0];
        this.props.addPreferences({ 
          location: date_location, 
          radius: date_radius, 
          startDate: day,
          startTime: start_time,
          duration: duration
        });
      }
      // hit Yelp API to get results for all main categories 
      let allCategories = this.props.categories.day.concat(this.props.categories.night);
      allCategories.forEach(category => {
        this.props.getResults(this.props.preferences.location, category, this.props.preferences.radius);
      });     

      let categories = [], lockedCategories = [], businesses = [], lockedBusinesses = [];
      let durations = { 'short': 1, 'medium': 2, 'long': 3 };
      // initalize state arrays using the duration preference for length
      for (let i = durations[this.props.preferences.duration]; i > 0; i--) {
        categories.push('');
        lockedCategories.push(false);
        businesses.push(null);
        lockedBusinesses.push(false);
      }

      if (res.data.length > 0) {
        axios.post('/api/yelp/business', { id: this.props.match.params.id })
             .then(res => {
              if (res.data.length > 0) {
                businesses = res.data;
                lockedBusinesses = lockedBusinesses.map(bool => true);
              }
              this.setState({ categories, lockedCategories, businesses, lockedBusinesses });
              this.refreshDate();
             })
      } else {
        this.setState({ categories, lockedCategories, businesses, lockedBusinesses });
        this.refreshDate();
      }
    });
  }

  // will run when our store changes (i.e., when results have been returned from our Yelp API call)
  componentWillReceiveProps(nextProps) {
    let { lockedBusinesses, categories, businesses } = this.state;
    let { results } = this.props;
    let newBusinesses = [...businesses];
    // nextProps.pending will be 0 when all API requests have resolved
    if (nextProps.pending === 0) {
      // set random business to unlocked indices if we have results for that category on our store
      lockedBusinesses.forEach((locked, index) => {
        if (!locked && results[categories[index]]) {
          let randIndex = Math.floor(Math.random() * results[categories[index]].length)
          newBusinesses[index] = results[categories[index]][randIndex];
        }
      })
      this.setState({ businesses: newBusinesses, isLoading: false });
    }
  }

  componentDidUnmount() {
    keymaster.unbind('space', this.handleSpace);
  }

  // to refresh a date, we need to 1. get random categories
  // then 2. use these categories to get random businesses
  refreshDate() {
    this.getRandomCategories(this.props.preferences.startTime);
  }

  // cycles through lockedBusinesses, when index is not locked it will 
  // use the random category from the same index to retrieve a random business
  updateBusinesses() {
    let { preferences, results, getResults, filters } = this.props;
    let { businesses, categories, lockedBusinesses } = this.state;
    let newBusinesses = [...businesses];
    // if we have results for the category, get them off store; otherwise use getResults to hit Yelp API
    lockedBusinesses.forEach((locked, index) => {
      if (!locked) {
        if (results[categories[index]]) {
          let filteredResults = results[categories[index]];

          // SETTINGS FILTERS
          if (filters.cheap) { filteredResults = filteredResults.filter(business => business.price === "$" || business.price === undefined) }
          if (filters.sober) { 
            filteredResults = filteredResults.filter(business => {
              let allCategories = business.categories.map(cat => cat.alias);
              return !allCategories.includes('bars') && !allCategories.includes('pubs') && !allCategories.includes('gaybars') && !allCategories.includes('lounges');
            })
          }

          let randIndex = Math.floor(Math.random() * filteredResults.length)
          newBusinesses[index] = filteredResults[randIndex];
        } else {
          getResults(preferences.location, categories[index], preferences.radius);
        }
      }
    });
    this.setState({ businesses: newBusinesses });
  }

  // sets appropriate number of random categories on state
  getRandomCategories(startTime) {
    let newCategories = [...this.state.categories];
    // only get a random category when its index is NOT locked
    this.state.lockedCategories.forEach((locked, index) => {
      if (!locked) {
        newCategories[index] = this.randomCategory(startTime);
      }
      // each location adds 2 hours to time
      startTime += 200;
    });
    // pass updateBusinesses as a callback so it runs AFTER we get our categories
    this.setState({ categories: newCategories }, () => {
      this.updateBusinesses();
    });
  }

  // return one random category given a start time
  randomCategory(startTime) {
    let time = '';
    if (630 < startTime && startTime < 1800) {
      time = 'day';
    } else {
      time = 'night';
    }


    
    // push a random category string to the categories array
    let mainCategories = this.props.categories[time];
    if (this.props.filters.sedentary) { mainCategories = mainCategories.filter(cat => cat !== 'active'); }
    let randIndex = Math.floor(Math.random() * mainCategories.length)
    return mainCategories[randIndex];
  }

  // given an index, updates lockedBusinesses at that index
  lockBusiness(index) {
    let lockedBusinesses = [...this.state.lockedBusinesses];
    lockedBusinesses[index] = !lockedBusinesses[index];
    this.setState({ lockedBusinesses });
  }

  // given an index and a subcategory, sets that category to the new subcategory
  // AND sets lockedCategories at that index to true
  lockCategory(index, newCategory) {
    let lockedCategories = [...this.state.lockedCategories];
    let lockedBusinesses = [...this.state.lockedBusinesses];
    let categories = [...this.state.categories];

    lockedCategories[index] = !lockedCategories[index];
    if (lockedCategories[index]) { 
      categories[index] = newCategory;
      lockedBusinesses[index] = false;
    };
    this.setState({ lockedCategories, categories, lockedBusinesses });
  }

  finalizeDate() {
    if (this.state.businesses.length !== 0) {
      // set all values in lockedBusinesses to true before finalizing
      let newLocked = [...this.state.lockedBusinesses];
      newLocked.forEach((bool, index) => newLocked[index] = true);
      this.setState({ lockedBusinesses: newLocked }, () => {
        this.props.finalizeDate(this.state.businesses);
        // store date in DB and put ID on store
        let { location, radius, startDate, startTime, duration } = this.props.preferences;
        let keys = [ "first_business", "second_business", "third_business" ];
        let date = { title: '', location, radius, startDate, startTime, duration  };
        this.state.businesses.forEach((business, index) => {
          if (business.id) {
            date[keys[index]] = business.id;
          }
        })

        // we update the table rather than adding a new entry if sharingId exists 
        if (!this.props.sharingId) {
          axios.post('/api/addDate', date).then(res => this.props.addSharingId(res.data));
        } else if (this.props.sharingId) {
          // update date
          axios.put(`/api/modifyDate/${this.props.sharingId}`, date);
        }
      });
    }
  }

  test(){
    let test = {test: "bJ6T7J"}
    axios.post('/api/yelp/business', test)
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSpace() {
    if (!this.state.isLoading) {
      this.refreshDate();
    }
    // prevents default behavior for spacebar (moving page down)
    return false;
  }

  handleShake() {
    if (!this.state.isLoading) {
      alert('shake!');
      this.refreshDate();
    }
  }

  render() {
    const actions = [
      <img
        primary={true}
        onClick={this.handleClose}
      />,
      <img
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];
    const styles = {
      block: {
        maxWidth: 300,
      },
      toggle: {
        marginTop: 30,
      },
      thumbSwitched: {
        backgroundColor: '#03a9f4',
      },
    };

    console.log('STATE:', this.state);
    console.log('PROPS:', this.props);
    let displayBusinesses = this.state.businesses.map((business, index) => {
      if (business !== null) {
        return (
          <div>
            <div>
              <DateCard business = {business} index = {index} time = {this.props.preferences.startTime + index * 200}
              lockedCategories = {this.state.lockedCategories[index]} lockedBusinesses = {this.state.lockedBusinesses[index]} lockBusiness = {this.lockBusiness} lockCategory = {this.lockCategory}/>
            </div>

            <div className="big-date">
           
              <Date business = {business} index = {index}
              lockedCategories = {this.state.lockedCategories[index]} lockedBusinesses = {this.state.lockedBusinesses[index]} lockBusiness = {this.lockBusiness} lockCategory = {this.lockCategory}/>
            </div>
                
              

          </div>
        )
      }
    })





    return (
      this.state.isLoading
        
        ?

        <Loading/>
        
        :

      <div className='date-results'>
       <div className='mobile-header' >
                <img className="logo-bulb" src={IconBulb} alt="Home Logo" height="75px" />
                <div className="right-icons">
                    <img onClick={this.handleOpen} className="filter-btn" src={FilterBtn} alt="Filter Button" height="80px" />
                        <Dialog
                            title="FILTER SETTINGS"
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                            style={{backgroundColor: 'rgba(225, 225, 225, .75)'}}
                            titleStyle={{fontSize: '36px', lineHeight: '40px', fontWeight: 'bold', fontFamily:'Helvetica'}}
                        >
                            <div style={styles.block}>
                                <Toggle
                                    label="I'M ON A BUDGET"
                                    labelPosition="right"
                                    style={styles.toggle}
                                    onToggle={ () => this.props.activateFilter('cheap') }
                                    toggled={ this.props.filters.cheap }
                                    thumbSwitchedStyle={styles.thumbSwitched}                                
                                />
                                <Toggle
                                    label="STONE COLD SOBER"
                                    labelPosition="right"
                                    style={styles.toggle}
                                    onToggle={ () => this.props.activateFilter('sober') }
                                    toggled={ this.props.filters.sober }
                                    thumbSwitchedStyle={styles.thumbSwitched}
                                />
                                <Toggle
                                    label="DON'T MAKE ME EXERCISE"
                                    labelPosition="right"
                                    style={styles.toggle}
                                    onToggle={ () => this.props.activateFilter('sedentary') }
                                    toggled={ this.props.filters.sedentary }
                                    thumbSwitchedStyle={styles.thumbSwitched}
                                />
                            </div>
                        </Dialog>
                    <img className="shuffle-btn" src={ShuffleBtn} onClick={ () => this.refreshDate() } alt="Shuffle Button" height="80px" />
                </div>


            </div>
              <div className="big-date">
                <div className='date-desktop'>
                  <SideNav shuffle ={ () => this.refreshDate() } finalizeDate={ () => this.finalizeDate() } refreshDate = {this.refreshDate} />
                  <div className="date-column">
                  { displayBusinesses }
                  </div>
                </div>
              </div>
              <div className = "is-small">
                  { displayBusinesses }
                  <SaveDate finalizeDate={ () => this.finalizeDate() } />
              </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getResults, finalizeDate, addSharingId, addPreferences, activateFilter })(DateResults);