import React from 'react';
import DeleteCard from '../../assets/Delete.svg';
import Star from '../../assets/Star.svg';
import TestPic from '../../assets/Couple.png';
import Lock from '../../assets/Lock.svg';
import Lock_White from '../../assets/Lock_White.svg';
import Arrow from '../../assets/Arrow.svg';


export default function Date() {
  return (
    <div>
      <div className='date'>
      <div className="circle-lock">
            <img className="lock-icon" src={Lock_White} alt="Lock Date Icon" height="50px" />
          </div>
        <div className="date-information">
          {/* <div className="top-level">
            <img className="delete" src={DeleteCard} alt="delete card" height="40px" />
          </div> */}

          <div className="second-top-level">
            <div className="results-text">START TIME:</div>
            <div className="results-response">4:30</div>
            <div className="category">
              <div className="results-text">TYPE:</div>
              <div className="results-response">AMERICAN</div>
              <img className="lock-icon-small" src={Lock} alt="Lock Type Icon" height="28px" />
            </div>
          </div>

          <div className="middle-level">
            <p className="place-name">Nick's Jumbo Burgers</p>
          </div>

          <div className="first-bottom-level">
            <div className="results-text">ADDRESS:</div>
            <div className="results-response">1234 Provo St., Provo, UT 84043</div>
            <div className="phone results-text">PHONE:</div>
            <div className="results-response">555-555-5555</div>
          </div>

        </div>

        <div className="yelp-container">
          <img className="yelp-desktop" src={TestPic} alt="YELP Place" />
        </div>
        
        <div className="side-level">
          <div className="ratings">
              <div className="rating-number">4.0</div>
              <img className="Star" src={Star} alt="Star Icon" height="25px" />
            </div>
            <div className="price">$$$</div>
        </div>

      </div>
    </div>
  );
}