import React, { Component } from 'react';
import { addPreferences } from '../../ducks/reducer';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Slider from 'material-ui/Slider';
import SearchRadiusInput from './Slider';


const marginStyle = {
  marginLeft: 18,
  marginRight: 18,
};

const marginState = {
  marginLeft: 18,
  marginRight: 18,
  width: 135
}


class Form extends Component {
  constructor() {
    super()
    this.state = {
      buttonClick: '',
      longitude: '',
      latitude: '',
      secondSlider: 10,
      errorLocation: false,
      hotAndNew: []
    }
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }


  handleSecondSlider = (event, value) => {
    this.setState({ secondSlider: value });

  };


  getLocation() {
    navigator.geolocation.getCurrentPosition(location => {
      console.log(location.coords.latitude);
      const { latitude, longitude } = location.coords;
      axios.get(`http://localhost:4200/api/yelp/hotandnew/${latitude}/${longitude}`)
           .then(res => {
              let businesses = res.data.businesses;
              let keys = Object.keys(businesses), hotAndNew = [];
              for (let i = 0; i < 10; i++) {
                hotAndNew.push(businesses[keys[i]]);
              }            
              this.setState({ hotAndNew })
            })
           .catch(err => console.log(err));
    });
  }

  createDate() {
    let time = this.refs.startTime.refs.input.input.value;
    let date = this.refs.startDate.refs.input.input.value;
    let location = this.refs.city.input.value + ',' + this.refs.state.input.value;

    if (time.includes('pm')) {

      time = time.replace(" pm", "").replace(":", '');
      time = parseFloat(time)
      console.log(time)
      //check if time is less than twelve   
      if (time < 1200) {
        //checks if is a single digit with two trailing zeros is less than 12 ex: 1:00 becomes 1
        if (time < 12) {
          time = time * 10 + 1200
        }
        time = time + 1200
        console.log(time)
      }
    }
    else {

      time = time.replace(" pm", "").replace(":", '');
      time = parseFloat(time)
      console.log(time)



      if (time < 12) {
        time = time * 100

      }
      if (time == 12) {
        time = 0
      }

      if (time > 1200 && time < 1261) {
        time = time - 1200
      }

      console.log(time)
    }
    //parseFloat(this.refs.radius.getValue()
    var milesToMeters = Math.round(this.state.secondSlider) * 1609.34
    milesToMeters = parseInt(milesToMeters)
    if (milesToMeters > 40000) {
      milesToMeters = 40000
    }
    if (location) {
      let preferences = {
        startDate: date,
        startTime: time || 1200,
        duration: this.state.buttonClick || 'long',
        location: this.refs.city.getValue() + ',' + this.refs.state.getValue(),
        radius: milesToMeters
      }

      this.props.addPreferences(preferences)
      this.props.history.push("/results")
    }

    else if (!location) {
      console.log("what")
    }
  }



  render() {
    console.log(this.state);

    { console.log(this.state.secondSlider) }
    return (
      <div className="date-form" id="createform">
        {console.log(this.state.buttonClick)}
        <div className="text-wrapper-form">
          <h5 className="form-title">CREATE YOUR PERFECT DATE!</h5>
        </div>
        <h3>START DATE:</h3>
        <DatePicker style={marginStyle}
          ref='startDate'
          hintText="01/12/2017" />
        <h3>START TIME:</h3>
        <TimePicker style={marginStyle}

          ref='startTime'
          hintText="12hr Format" />
        <h3>LENGTH:</h3>
        <div className="btn-length">
          <h4 className="gray-text subtitle-short">1 HOUR</h4>
          <button className="second-btn btn-short" onClick={() => this.setState({ buttonClick: "short" })}>SHORT</button>
          <h4 className="gray-text subtitle-medium">2-3 HOURS</h4>
          <button className="second-btn btn-medium" onClick={() => this.setState({ buttonClick: "medium" })}>MEDIUM</button>
          <h4 className="gray-text subtitle-long">4+ HOURS</h4>
          <button className="second-btn btn-long" onClick={() => this.setState({ buttonClick: "long" })}>LONG</button>
        </div>
        <h3>LOCATION:</h3>

        <TextField style={marginState}
          ref="city"
          hintText="Provo"
        />

        <TextField style={marginState}
          ref="state"
          hintText="UT"
        />

        <h3>RADIUS: {this.state.secondSlider} miles</h3>
        <Slider 
          style={marginStyle}
          min={1}
          max={25}
          step={1}
          value={this.state.secondSlider}
          onChange={this.handleSecondSlider}
        />



        <button className="main-btn create-btn" onClick={() => { this.createDate() }}>CREATE</button>
      </div >
    );
  }
}

function mapStateToProps(state) {
  return {
    preferences: state.preferences
  }

}
export default withRouter(connect(mapStateToProps, { addPreferences })(Form))
