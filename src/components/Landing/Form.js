import React, { Component } from 'react';
import { addPreferences } from '../../ducks/reducer';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Slider from 'material-ui/Slider';
import SearchRadiusInput from './Slider';


class Form extends Component {  
  constructor() {
    super()
    this.state = {
      buttonClick: '',
      longitude: '',
      latitude: '',
      secondSlider: 10,
      errorLocation: false,
    }
    this.getLocation = this.getLocation.bind(this);
  }


  handleSecondSlider = (event, value) => {
    this.setState({secondSlider: value});
    
  };


  getLocation() {
    navigator.geolocation.getCurrentPosition(function (location) {
      console.log(location.coords.latitude);
      console.log(location.coords.longitude);
      console.log(location.coords.accuracy);

    });
  }

  createDate() {
    let time =  this.refs.startTime.refs.input.input.value;
    let date = this.refs.startDate.refs.input.input.value;
    let location = this.refs.location.input.value ;
    console.log(this.refs.location.input.value)
  console.log(this.refs.location.input.value)
  
  if(time.includes('pm')){
    
    time = time.replace(" pm", "").replace(":", '');
    time = parseFloat(time)
    console.log(time)
    //check if time is less than twelve   
    if(time < 1200 ){
      //checks if is a single digit with two trailing zeros is less than 12 ex: 1:00 becomes 1
      if(time < 12){
        time = time *10 + 1200
      }
      time = time + 1200
    console.log(time)   
  }
}
  else{
    
    time = time.replace(" pm", "").replace(":", '');
    time = parseFloat(time)
    console.log(time)
    
   

    if(time < 12){
      time = time *100
      
    }
    if(time == 12){
      time = 0
    }

    if(time> 1200 && time < 1261){
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
        startTime: time,
        duration: this.state.buttonClick,
        location: this.refs.location.getValue(),
        radius: milesToMeters
      }
    
      this.props.addPreferences(preferences)
      this.props.history.push("/results")
    }
    
    else if(!location){
      console.log("what")
    }
 }



  render() {      



    {console.log(this.state.secondSlider)}
    return (
      <div className="date-form">
        {console.log(this.state.buttonClick)}
        <div className = "text-wrapper">
        <h5 >CREATE YOUR</h5>
        <h5 >PERFECT DATE!</h5>
        </div>
        <h3>START DATE:</h3>
        <DatePicker
          ref='startDate'
          hintText="01/12/2017" />
        <h3>START TIME:</h3>
        <TimePicker
        
          ref='startTime'
          hintText="12hr Format" />
        <h3>LENGTH:</h3>
        <h4 className="gray-text">1 HOUR</h4>
        <button className="second-btn" onClick={() => this.setState({ buttonClick: "short" })}>SHORT</button>
        <h4 className="gray-text">2-3 HOURS</h4>
        <button className="second-btn" onClick={() => this.setState({ buttonClick: "medium" })}>MEDIUM</button>
        <h4 className="gray-text">4+ HOURS</h4>
        <button className="second-btn" onClick={() => this.setState({ buttonClick: "long" })}>LONG</button>
        <h3>LOCATION:</h3>
        
          <TextField
          ref="location"
          hintText="Provo, UT"
          
            />
        
        
        <h3>RADIUS: {this.state.secondSlider} miles</h3>
        <Slider
          min={1}
          max={25}
          step={1}
          value={this.state.secondSlider}
          onChange={this.handleSecondSlider}
        />
        
        

        <button className="main-btn" onClick={() => { this.createDate() }}>CREATE</button>
      </div >
    );
  }
}

function mapStateToProps(state) {
  return {
    preferences: state.preferences
  }

}
export default withRouter(connect(mapStateToProps, {addPreferences})(Form))
