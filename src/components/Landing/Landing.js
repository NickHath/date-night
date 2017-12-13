import React from 'react';
import Form from './Form';
import Mobile_Ocean from '../../assets/Mobile_Ocean.svg';
import Logo_White from '../../assets/Logo_White.svg';
import Clipboard from '../../assets/Clipboard.svg';
import ShuffleTwo from '../../assets/Shuffle_Two.svg';
import Calendar from '../../assets/Calendar.svg';
import Logo_Icon from '../../assets/Icon.svg';
import Couple from '../../assets/Couple.png';
import Love from '../../assets/CoupleFull.jpg';
import Arrow_Nav from '../../assets/Arrow_White.svg';

export default function Landing() {
  return (
    <div className='landing'>
      <div className="first-bg-box">
        <img className="logo" src={Logo_White} alt="Date Idea Generator Logo" />
        {/* <img className="arrow-down-nav" src={Arrow_Nav} alt="Click to scroll down"/>  */}
      </div>
      <div className="header-bar"></div>
      <div className="text-wrapper">
        <h1>HOW DOES IT WORK?</h1>
      </div>
      <div className="icon-box">
        <img className="icon-clipboard" src={Clipboard} alt="clipboard icon" />
        <h2 className="icon-text-clipboard">LIST YOUR AVAILABLE TIME</h2>
        <img className="icon-shuffle" src={ShuffleTwo} alt="shuffle icon" />
        <h2 className="icon-text-shuffle">SHUFFLE RESULTS TO BEST FIT YOU</h2>
        <img className="icon-calendar" src={Calendar} alt="calendar icon" />
        <h2 className="icon-text-calendar">ENJOY YOUR PERFECT DATE</h2>
      </div>
      <div className="btn-container">
        <button className="main-btn">CREATE YOUR DATE</button>
        <button className="second-btn">EXPLORE FEATURED</button>
      </div>
      <div className="featured">NEWLY OPENED</div>
      <div className="form-desktop">
        <div className="logo-lines">
          <div className="line"></div>
          <img className="logo-icon" src={Logo_Icon} alt="Date Idea Generator Icon" />
          <div className="line"></div>
        </div>
        <div className="img-wrapper">
          <img className="second-bg" src={Couple} alt="Couple Hugging" />
          <img className="replace-photo" src={Love} alt="Couple Hugging" />
          <h2 className="photo-caption">CREATE YOUR PERFECT DATE!</h2>
        </div>
        <Form />
      </div>
    </div>
  );
}