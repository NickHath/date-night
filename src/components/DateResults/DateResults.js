import React, { Component } from 'react';
import axios from 'axios';

// components
import Date from './Date';
import MobileHeader from './MobileHeader';
import DateCard from './DateCard';
import SaveDate from './SaveDate';
import AddCard from './AddCard';
import DateDesktop from './DateDesktop';

//materialUI
import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';
// redux
import { connect } from 'react-redux';
import { getResults, finalizeDate, addSharingId, addPreferences } from '../../ducks/reducer';
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
    this.state = {
      categories: [],
      lockedCategories: [],
      businesses: [],
      lockedBusinesses: [],
      expanded: false,
      loading: true
    }
  }

  // runs the initial refreshDate after component renders
  componentDidMount() {
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
      this.setState({ businesses: newBusinesses, loading: false });
    }
  }

  // to refresh a date, we need to 1. get random categories
  // then 2. use these categories to get random businesses
  refreshDate() {
    this.getRandomCategories(this.props.preferences.startTime);
  }

  // cycles through lockedBusinesses, when index is not locked it will 
  // use the random category from the same index to retrieve a random business
  updateBusinesses() {
    let { preferences, results, getResults } = this.props;
    let { businesses, categories, lockedBusinesses } = this.state;
    let newBusinesses = [...businesses];
    // if we have results for the category, get them off store; otherwise use getResults to hit Yelp API
    lockedBusinesses.forEach((locked, index) => {
      if (!locked) {
        if (results[categories[index]]) {
          let randIndex = Math.floor(Math.random() * results[categories[index]].length)
          newBusinesses[index] = results[categories[index]][randIndex];
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
    let categories = [...this.state.categories];

    lockedCategories[index] = !lockedCategories[index];
    if (lockedCategories[index]) { categories[index] = newCategory };
    this.setState({ lockedCategories, categories });
  }

  finalizeDate() {
    if (this.state.businesses.length !== 0) {
      // set all values in lockedBusinesses to true before finalizing
      let newLocked = [...this.state.lockedBusinesses];
      newLocked.forEach((bool, index) => newLocked[index] = true);
      this.setState({ lockedBusinesses: newLocked }, () => {
        this.props.finalizeDate(this.state.businesses);
        // store date in DB and put ID on store
<<<<<<< HEAD
        let keys = ["first_business", "second_business", "third_business"];
        let date = { title: '' };
=======
        let { location, radius, startDate, startTime, duration } = this.props.preferences;
        let keys = [ "first_business", "second_business", "third_business" ];
        let date = { title: '', location, radius, startDate, startTime, duration  };
>>>>>>> master
        this.state.businesses.forEach((business, index) => {
          if (business.id) {
            date[keys[index]] = business.id;
          }
        })
        axios.post('/api/addDate', date).then(res => this.props.addSharingId(res.data));
      });
    }
  }

<<<<<<< HEAD
  hideAndUnhide() {
=======
  test(){
    let test = {test: "bJ6T7J"}
    axios.post('/api/yelp/business', test)
  }

  hideAndUnhide(){
>>>>>>> master


  }


  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };



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
<<<<<<< HEAD

        console.log(business)
=======
>>>>>>> master
        return (
          <div>
            <div className='date-card'>
              <div className="top-level">
                <img className="delete" src={DeleteCard} alt="delete card" height="40px" />
                <div className="ratings">
                  <div className="rating-number">{business.rating}</div>
                  <img className="Star" src={Star} alt="Star Icon" height="25px" />
                </div>
              </div>
              <div className="mid-level">
                <div className="start-box">
                  <img className="start-icon" src={Clock} alt="Starting Time Clock" height="80px" />
                  <div className="start-time">4:30pm</div>
                </div>
                <img className="yelp-img" src={business.image_url ? business.image_url : logo} alt="YELP Place" />
                <img className="lock-icon" onClick={() => this.lockBusiness(index)} src={Lock} alt="Lock Date Icon" height="80px" />
              </div>
              <div className="location-text">
                <h4>{business.name}</h4>
              </div>
              <div className="gray-line"></div>
              <div className="expandable-container">
                <div className="see-more">SEE MORE DETAILS</div>
                <img className="expandable-arrow" src={Arrow} alt="click to expand" width="30px" />
              </div>

              <div className={this.state.expanded ? "expanded" : "closed"}>
                <div className="see-more">HIDE DETAILS</div>
                <img className="expandable-arrow" src={Arrow} alt="click to expand" width="30px" />
                <div className={!this.state.lockedCategories[index] ? "lock-type" : "locked-category"} onClick={() => this.lockCategory(index, business.categories[0].alias)}>
                  <div className="type">TYPE:</div>
                  <div className="type-response" >{business.categories[0].title}</div>
                  <img className="lock-icon-small" src={Lock} alt="Lock Type Icon" height="28px" />
                </div>
                <div className="data-box">
                  <div className="data-labels">
                    <div className="data phone">PHONE:</div>
                    <div className="data first-address">ADDRESS:</div>
                    <div className="data second-address"></div>
                  </div>
                  <div className="data-response">
                    <div className="data phone-response">555-555-5555</div>
                    <div className="data first-address-response">1234 Provo St.</div>
                    <div className="data second-address-response">Provo, UT 84043</div>
                  </div>
                </div>
                <div className="hours"></div>
              </div>
              <div className="bottom-level">
                <div className="price-level">{business.price}</div>
              </div>
            </div>

            <div className="big-date">
                <DateDesktop />
              </div>

          </div>
        )
      }
    })

    return (
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
              style={{ backgroundColor: 'rgba(225, 225, 225, .75)' }}
              titleStyle={{ fontSize: '36px', lineHeight: '40px', fontWeight: 'bold', fontFamily: 'Helvetica' }}
            >
              <div style={styles.block}>
                <Toggle
                  label="I'M ON A BUDGET"
                  labelPosition="right"
                  style={styles.toggle}
                  thumbSwitchedStyle={styles.thumbSwitched}
                />
                <Toggle
                  label="STONE COLD SOBER"
                  labelPosition="right"
                  style={styles.toggle}
                  thumbSwitchedStyle={styles.thumbSwitched}
                />
                <Toggle
                  label="DON'T MAKE ME EXERCISE"
                  labelPosition="right"
                  style={styles.toggle}
                  thumbSwitchedStyle={styles.thumbSwitched}
                />
              </div>
            </Dialog>
            <img className="shuffle-btn" src={ShuffleBtn} onClick={() => this.refreshDate()} alt="Shuffle Button" height="80px" />
          </div>
        </div>



        {displayBusinesses}
        <SaveDate finalizeDate={() => this.finalizeDate()} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getResults, finalizeDate, addSharingId, addPreferences })(DateResults);