import React from 'react';
import DeleteCard from '../../assets/Delete.svg';
import Star from '../../assets/Star.svg';
import Clock from '../../assets/Start.svg';
import TestPic from '../../assets/Couple.png';
import Lock from '../../assets/Lock.svg';
import Arrow from '../../assets/Arrow.svg';


export default function DateCard() {
  return (
    <div className='date-card'>
      <div className="top-level">
        <img className="delete" src={DeleteCard} alt="delete card" height="40px" />
        <div className="ratings">
          <div className="rating-number">4.0</div>
          <img className="Star" src={Star} alt="Star Icon" height="25px" />
        </div>
      </div>
      <div className="mid-level">
        <div className="start-box">
          <img className="start-icon" src={Clock} alt="Starting Time Clock" height="80px" />
          <div className="start-time">4:30pm</div>
        </div>
        <img className="yelp-img" src={TestPic} alt="YELP Place" />
        <img className="lock-icon" src={Lock} alt="Lock Date Icon" height="80px" />
      </div>
      <div className="location-text">
        <h4>Nick's Jumbo Burgers</h4>
      </div>
      <div className="gray-line"></div>
      <div className="expandable-container">
        <div className="see-more">SEE MORE DETAILS</div>
        <img className="expandable-arrow" src={Arrow} width="30px" />
      </div>

    </div>
  );
}