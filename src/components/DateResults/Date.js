import React from 'react';
import DeleteCard from '../../assets/Delete.svg';
import Star from '../../assets/Star.svg';
import TestPic from '../../assets/Couple.png';
import Lock from '../../assets/Lock.svg';
import Lock_White from '../../assets/Lock_White.svg';
import Arrow from '../../assets/Arrow.svg';
import logo from '../../assets/Icon.svg';


export default function Date(props) {
  console.log(props)
  return (
    
      <div className='date'>
      <div className="circle-lock" onClick={() => props.lockBusiness(props.index)}>
            <img className="lock-icon" src={Lock_White} alt="Lock Date Icon" height="50px" />
          </div>
        <div className="date-information">
          {/* <div className="top-level">
            <img className="delete" src={DeleteCard} alt="delete card" height="40px" />
          </div> */}

          <div className="second-top-level">
            <div className="results-text">START TIME:</div>
            <div className="results-response">4:30</div>
            <div className= {!props.lockedCategories?"category" : "locked-category"} >
              <div className="results-text">TYPE:</div>
              <div className="results-response">{props.business.categories[0].title}</div>
              <img className="lock-icon-small"
              
              onClick={() => props.lockCategory(props.index, props.business.categories[0].alias)} src={Lock} alt="Lock Type Icon" height="28px" />
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
              <div className="rating-number">{props.business.rating}</div>
              <img className="Star" src={Star} alt="Star Icon" height="25px" />
            </div>
            <div className="price">{props.business.price}</div>
        </div>

      </div>
    
  );
}