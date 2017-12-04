import React, { Component } from 'react';
import axios from 'axios';

// components
import Date from './Date';

// redux
import { connect } from 'react-redux';
import { getBusinesses } from '../../ducks/reducer';

class DateResults extends Component {
  componentDidMount() {
    // gets their location/radius from either the store or props
    // and the category comes from a random search based on their
    // input (start time, duration)
    this.props.getBusinesses('provo', 'coffee');
  }

  render() {
    console.log(this.props);
    return (
      <div className='date-results'>
        <h1>All results from our date search</h1>
        // render several date components here
        { JSON.stringify(this.props.businesses) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { businesses: state.businesses, categories: state.categories };
}

export default connect(mapStateToProps, { getBusinesses })(DateResults);