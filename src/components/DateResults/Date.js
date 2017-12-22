import React from 'react';
import DeleteCard from '../../assets/Delete.svg';
import Star from '../../assets/Star.svg';
import TestPic from '../../assets/Couple.png';
import Lock from '../../assets/Lock.svg';

import lockWhite from '../../assets/locker.svg';
import lockbar from '../../assets/lockbar.svg';
import Arrow from '../../assets/Arrow.svg';
import logo from '../../assets/Icon.svg';
import lockbarBlack from '../../assets/lockbar-black.svg';
import lockBlack from '../../assets/locker-black.svg';

export default function Date(props) {
  console.log(props)
  return (
      <div className='date'>
      <div className="circle-lock" onClick={() => props.lockBusiness(props.index)}>
            <img src={lockWhite} className="lock"/>
            <img src={lockbar} id={props.lockedBusinesses ? "" : "unlocked"} className="lockbar" />
          </div>
        <div className="date-information">
          {/* <div className="top-level">
            <img className="delete" src={DeleteCard} alt="delete card" height="40px" />
          </div> */}

          <div className="second-top-level">
            <div className="results-text">START TIME:</div>
            <div className="results-response">4:30</div>
            <div className= {!props.lockedCategories?"category" : "big-locked"} onClick={() => props.lockCategory(props.index, props.business.categories[0].alias)} >
              <div className="results-text">TYPE:</div>
              <div className="results-response">{props.business.categories[0].title}</div>

                  <div className="little-lock" >
                  <img src={lockBlack} className="lock2"/>
                  <img src={lockbarBlack} id={props.lockedCategories ? "" : "unlocked2"} className="lockbar2" />
                </div>

            </div>
            
          </div>

          <div className="middle-level">
            <p className="place-name">{props.business.name}</p>
          </div>

          <div className="first-bottom-level">
            <div className="results-text">ADDRESS:</div>
            <div className="results-response">{props.business.location.display_address[0]},<p> </p> 
            {props.business.location.display_address[1]} <p> </p>{props.business.location.display_address[2]}</div>
            <div className="phone results-text">PHONE:</div>
            <div className="results-response">{props.business.display_phone}</div>
          </div>

        </div>

        <div className="yelp-container">
          <img className="yelp-desktop" src={props.business.image_url ? props.business.image_url : logo} alt="YELP Place" />
        </div>
        
        <div className="side-level">
          <div className="ratings">
              <div className="rating-num">{props.business.rating}</div>
              <img className="Star" src={Star} alt="Star Icon" height="25px" />
            </div>
            <div className="price">{props.business.price}</div>
        </div>

      </div>
    
  );
}