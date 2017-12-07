import React, { Component } from 'react';
import {addPreferences} from '../../ducks/reducer';
import {Link} from 'react-router-dom';
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
      startTime: parseInt(this.refs.startTime.value),
      duration: this.state.buttonClick,
      location: this.refs.location.value,
      radius: milesToMeters
    };
    this.props.addPreferences(preferences);
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
      <Link to = "/results" onClick = { () =>{this.createDate()}}> <button>click me hoe</button></Link>
      </div>
  );
}
}

function mapStateToProps(state){
  return{
    preferences: state.preferences
  }

}
export default connect(mapStateToProps, { addPreferences })(Form)