import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPopularDates } from '../../ducks/reducer';

class PopularDates extends Component {
  handleClick() {
    this.props.getPopularDates(this.refs['location'].value);
  }

  render() {
    const allDates = this.props.popularDates.map(date => {
      return (
        <Link to={ `results/${date.date_id}` }>
          <div>
            { date.first_business } { date.second_business } { date.third_business }
          </div>
        </Link>
      );
    });
    return (
      <div className='popular-dates-wrapper'>
        <input ref='location'/>
        <button onClick={ () => this.handleClick() }>Get Dates</button>
        { allDates }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { popularDates: state.popularDates };
}

export default connect(mapStateToProps, { getPopularDates })(PopularDates);