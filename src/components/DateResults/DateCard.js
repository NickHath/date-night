import React, { Component } from 'react';
import DeleteCard from '../../assets/Delete.svg';
import Star from '../../assets/Star.svg';
import Clock from '../../assets/Start.svg';
import TestPic from '../../assets/Couple.png';
import Lock from '../../assets/Lock.svg';
import Arrow from '../../assets/Arrow.svg';
import logo from '../../assets/Icon.svg';

export default class DateCard extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  handleOpen() {
    this.setState({ expanded: true });
  }

  handleClose() {
    this.setState({ expanded: false });
  }

  convertTime() {
    let standard = '', military = this.props.time;
    if (!this.props.time) { return '1-2 hrs' };
    if (military >= 1200) {
      military >= 1300 ? military -= 1200 : null;
      military = military.toString();
      standard += military.slice(0, military.length - 2) + ':' + military.slice(military.length - 2) + ' pm';
    } else {
      military = military.toString();
      standard += military.slice(0, military.length - 2) + ':' + military.slice(military.length - 2) + ' am';
    }
    return standard;
  }

  render() {
    return (
      <div className='date-card'>
        <div className="top-level">
          {/* <img className="delete" src={DeleteCard} alt="delete card" height="40px" /> */}
          <div className="price-level">{this.props.business.price}</div>
          <div className="ratings-mobile">
            <div className="rating-number">{this.props.business.rating}</div>
            <img className="Star" src={Star} alt="Star Icon" height="25px" />
          </div>
        </div>
        <div className="mid-level">
          <div className="start-box">
            <img className="start-icon" src={Clock} alt="Starting Time Clock" height="80px" />
            <div className="start-time">{this.props.time ? this.convertTime(this.props.time) : '1-2 hrs'}</div>
          </div>
          <img className="yelp-img" src={this.props.business.image_url ? this.props.business.image_url : logo} alt="YELP Place" />
          <img className="lock-icon" onClick={() => this.props.lockBusiness(this.props.index)} src={Lock} alt="Lock Date Icon" height="80px" />
        </div>
        <div className="location-text">
          <h4>{this.props.business.name}</h4>
        </div>
        <div className="gray-line"></div>
        {
          !this.state.expanded ? 
            <div className="expandable-container" onClick={ () => this.handleOpen() }>
              <div className="see-more">SEE MORE DETAILS</div>
              <center><img className="expandable-arrow" src={Arrow} alt="click to expand" width="30px" /></center>
            </div>

            :
            
            <div className={this.state.expanded ? "expanded" : "closed"}>
            <div className="see-more" onClick={ () => this.handleClose() }>HIDE DETAILS</div>
            <img className="hide-arrow" src={Arrow} alt="click to expand" width="30px" onClick={ () => this.handleClose() } />
            <div className={!this.props.lockedCategories? "lock-type" : "locked-category"} onClick={() => this.props.lockCategory(this.props.index, this.props.business.categories[0].alias)}>
              <div className="type">TYPE:</div>
              <div className="type-response" >{this.props.business.categories[0].title}</div>
              <img className="lock-icon-small" src={Lock} alt="Lock Type Icon" height="28px" />
            </div>
            <div className="data-box">
              <div className="data-labels">
                <div className="data phone">PHONE:</div>
                <div className="data first-address">ADDRESS:</div>
                <div className="data second-address"></div>
              </div>
              <div className="data-response">
                <div className="data phone-response">{this.props.business.display_phone}</div>
                <div className="data first-address-response">{this.props.business.location.display_address[0]}</div>
                <div className="data second-address-response">{this.props.business.location.display_address[1]}</div>
                <div className="data">{this.props.business.location.display_address[2]}</div>
              </div>
            </div>
            <div className="hours"></div>
          </div>
        }

        <div className="bottom-level">
        </div>
      </div>
    );  
    }
}