import React, { Component } from 'react';
import Add from '../../assets/Add.svg';

export default class AddCard extends Component {
  render() {
    return (
      <div className="add-card-box">
        <div className="add-text">ADD MORE TIME</div>
        <img className="add-card" src={Add} alt="add date card" width="50px"/>
      </div>
    )
  }
}
