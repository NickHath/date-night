import React, { Component } from 'react';
import axios from 'axios';

// components
import Date from './Date';
import MobileHeader from './MobileHeader';
import DateCard from './DateCard';
import SaveDate from './SaveDate';
import AddCard from './AddCard';
//materialUI
import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';
// redux
import { connect } from 'react-redux';
import { getResults } from '../../ducks/reducer';
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

class DateResults extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      lockedCategories: [],
      businesses: [],
      lockedBusinesses: [],
      expanded:true ,
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

  hideAndUnhide(){


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
        
        console.log(business)
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
        <img className="lock-icon" onClick={ () => this.lockBusiness(index) } src={Lock} alt="Lock Date Icon" height="80px" />
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
        <div className={!this.state.lockedCategories[index] ?"lock-type" : "locked-category"} onClick={ () => this.lockCategory(index, business.categories[0].alias) }>
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
                            style={{backgroundColor: 'rgba(225, 225, 225, .75)'}}
                            titleStyle={{fontSize: '36px', lineHeight: '40px', fontWeight: 'bold', fontFamily:'Helvetica'}}
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
                    <img className="shuffle-btn" src={ShuffleBtn} onClick={ () => this.refreshDate() } alt="Shuffle Button" height="80px" />
                </div>
            </div>
        
      
        
      { displayBusinesses }
        <SaveDate />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getResults })(DateResults);