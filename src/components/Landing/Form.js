import React, { Component } from 'react';
import {addPreferences} from '../../ducks/reducer';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
class Form extends Component {
  constructor(){
    super()
    this.state = {
      buttonClick: '',
      longitude: '',
      latitude: ''
    }
    this.getLocation = this.getLocation.bind(this); 
  }

  getLocation(){
    navigator.geolocation.getCurrentPosition(function(location) {
      console.log(location.coords.latitude);
      console.log(location.coords.longitude);
      console.log(location.coords.accuracy);
      
    });
  }

  createDate(){
    

    var milesToMeters = Math.round(parseFloat(this.refs.radius.value) * 1609.34)
   if(milesToMeters > 40000){
     milesToMeters = 40000
   }
  if(this.refs.location.value){
    let preferences = {
      startDate: this.refs.startDate.value,
      startTime: this.refs.startTime.value,
      duration: this.state.buttonClick,
      location: this.refs.location.value,
      radius: milesToMeters
    }
    console.log(preferences)
    this.props.addPreferences(preferences)
    this.props.history.push("/results")
    
  }
 
else{
  alert("please put in a location bitch")
}

  }


render(){
  return (
    <div className='form'>
       {console.log(this.state.buttonClick)}
      <input type="text" placeholder = "start Date" ref = 'startDate'  />
      <input type="text" placeholder = "start Time" ref = 'startTime'/>
      <button onClick = {() => this.setState ({buttonClick: "short"})} >Short </button>
      <button onClick = {() => this.setState ({buttonClick: "medium"})} >medium </button>
      <button onClick = {() => this.setState ({buttonClick: "long"})} >long </button>
      <input type="text" placeholder = "location" ref = "location"/>
      <input type="integer" placeholder = "radius" ref = "radius"/>
      
      
       <button onClick = { () =>{this.createDate()}}>click me hoe</button>
      </div>
  );
}
}

function mapStateToProps(state){
  return{
    preferences: state.preferences
  }

}
export default withRouter(connect(mapStateToProps, {addPreferencnes})(Form))