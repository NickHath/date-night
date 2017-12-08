import React, { Component } from 'react';
<<<<<<< HEAD
import {addPreferences} from '../../ducks/reducer';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
class Form extends Component {
  constructor(){
=======
import { addPreferences } from '../../ducks/reducer';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
// import Slider from 'material-ui/Slider';
import SearchRadiusInput from './Slider';


class Form extends Component {  
  constructor() {
>>>>>>> master
    super()
    this.state = {
      buttonClick: '',
      longitude: '',
      latitude: '',
    }
    this.getLocation = this.getLocation.bind(this);
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(function (location) {
      console.log(location.coords.latitude);
      console.log(location.coords.longitude);
      console.log(location.coords.accuracy);

    });
  }

  createDate() {
    var milesToMeters = Math.round(parseFloat(this.refs.radius.getValue()) * 1609.34)
    if (milesToMeters > 40000) {
      milesToMeters = 40000
    }
    if (this.refs.location.getValue()) {
      let preferences = {
        startDate: this.refs.startDate.getValue(),
        startTime: this.refs.startTime.getValue(),
        duration: this.state.buttonClick,
        location: this.refs.location.getValue(),
        radius: milesToMeters
      }
      console.log(preferences)
      this.props.addPreferences(preferences)
      //link here
    }
    else {
      alert("please put in a location bitch")
    }
  }


  render() {      
    return (
      <div className="date-form">
        {console.log(this.state.buttonClick)}
        <h1>CREATE YOUR PERFECT DATE!</h1>
        <h3>START DATE</h3>
        <DatePicker
          ref='startDate'
          hintText="01/12/2017" />
        <h3>START TIME</h3>
        <TimePicker
          ref='startTime'
          hintText="12hr Format" />
        <h3>LENGTH</h3>
        <h4 className="gray-text">1 HOUR</h4>
        <button className="second-btn" onClick={() => this.setState({ buttonClick: "short" })}>SHORT</button>
        <h4 className="gray-text">2-4 HOURS</h4>
        <button className="second-btn" onClick={() => this.setState({ buttonClick: "medium" })}>MEDIUM</button>
        <h4 className="gray-text">5-8 HOURS</h4>
        <button className="second-btn" onClick={() => this.setState({ buttonClick: "long" })}>LONG</button>
        <h3>LOCATION</h3>
        <TextField
          ref="location"
          hintText="Provo, UT" />
        <h3>RADIUS</h3>
        {/* <Slider defaultValue={25} /> */}

        <SearchRadiusInput />

        <Link to="/results" onClick={() => { this.createDate() }}> <button className="main-btn">CREATE</button></Link>
      </div >
    );
  }
}

function mapStateToProps(state) {
  return {
    preferences: state.preferences
  }

}
<<<<<<< HEAD
export default withRouter(connect(mapStateToProps, {addPreferencnes})(Form))
=======
export default connect(mapStateToProps, { addPreferences })(Form)
>>>>>>> master
