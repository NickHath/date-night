import React from 'react';
import DeleteCard from '../../assets/Delete.svg';
import Star from '../../assets/Star.svg';
import Clock from '../../assets/Start.svg';
import TestPic from '../../assets/Couple.png';
import Lock from '../../assets/Lock.svg';
import Arrow from '../../assets/Arrow.svg';
import logo from '../../assets/Icon.svg';

export default function DateCard(props) {
  console.log(props)
  return (
    
    <div className='date-card'>
              <div className="top-level">
                <img className="delete" src={DeleteCard} alt="delete card" height="40px" />
                <div className="ratings">
                  <div className="rating-number">{props.business.rating}</div>
                  <img className="Star" src={Star} alt="Star Icon" height="25px" />
                </div>
              </div>
              <div className="mid-level">
                <div className="start-box">
                  <img className="start-icon" src={Clock} alt="Starting Time Clock" height="80px" />
                  <div className="start-time">4:30pm</div>
                </div>
                <img className="yelp-img" src={props.business.image_url ? props.business.image_url : logo} alt="YELP Place" />
                <img className="lock-icon" onClick={() => props.lockBusiness(props.index)} src={Lock} alt="Lock Date Icon" height="80px" />
              </div>
              <div className="location-text">
                <h4>{props.business.name}</h4>
              </div>
              <div className="gray-line"></div>
              <div className="expandable-container">
                <div className="see-more">SEE MORE DETAILS</div>
                <img className="expandable-arrow" src={Arrow} alt="click to expand" width="30px" />
              </div>

              <div className={props.expanded ? "expanded" : "closed"}>
                <div className="see-more">HIDE DETAILS</div>
                <img className="expandable-arrow" src={Arrow} alt="click to expand" width="30px" />
                <div className={!props.lockedCategories? "lock-type" : "locked-category"} onClick={() => props.lockCategory(props.index, props.business.categories[0].alias)}>
                  <div className="type">TYPE:</div>
                  <div className="type-response" >{props.business.categories[0].title}</div>
                  <img className="lock-icon-small" src={Lock} alt="Lock Type Icon" height="28px" />
                </div>
                <div className="data-box">
                  <div className="data-labels">
                    <div className="data phone">PHONE:</div>
                    <div className="data first-address">ADDRESS:</div>
                    <div className="data second-address"></div>
                  </div>
                  <div className="data-response">
                    <div className="data phone-response">{props.business.display_phone}}</div>
                    <div className="data first-address-response">{props.business.location.display_address[0]}</div>
                    <div className="data second-address-response">{props.business.location.display_address[1]}</div>
                    <div className="data">{props.business.location.display_address[2]}</div>
                  </div>
                </div>
                <div className="hours"></div>
              </div>
              <div className="bottom-level">
                <div className="price-level">{props.business.price}</div>
              </div>
            </div>
  );
}