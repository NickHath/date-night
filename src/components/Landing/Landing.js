import React from 'react';
import Form from './Form';
import Mobile_Ocean from '../../assets/Mobile_Ocean.svg';
import Logo_White from '../../assets/Logo_White.svg';
import Clipboard from '../../assets/Clipboard.svg';
import Shuffle from '../../assets/Shuffle.svg';
import Calendar from '../../assets/Calendar.svg';
import Logo_Icon from '../../assets/Icon.svg';
import Couple from '../../assets/Couple.png';

export default function Landing() {
  return (
    <div className='landing'>
      <div className="first-bg-box">
        <img className="first-bg" src={Mobile_Ocean} alt="Ocean Kayaking Date" width="100%" />
        <img className="logo" src={Logo_White} alt="Date Idea Generator Logo" />
      </div>
      <div className="header-bar"></div>
      <h1>HOW DOES IT WORK?</h1>
      <div className="icon-box">
        <img className="icons" src={Clipboard} alt="clipboard icon" />
        <h2 className="icon-text">LIST YOUR AVAILABLE TIME</h2>
        <img className="icons" src={Shuffle} alt="shuffle icon" />
        <h2 className="icon-text">SHUFFLE RESULTS TO BEST FIT YOU</h2>
        <img className="icons" src={Calendar} alt="calendar icon" />
        <h2 className="icon-text">ENJOY YOUR PERFECT DATE</h2>
      </div>
      <div className="btn-container">
        <button className="main-btn">CREATE YOUR DATE</button>
        <button className="second-btn">EXPLORE FEATURED</button>
      </div>
      <div className="featured">NEWLY OPENED</div>
      <div className="logo-lines">
        <div className="line"></div>
        <img className="logo-icon" src={ Logo_Icon } alt="Date Idea Generator Icon" />
        <div className="line"></div>
      </div>
      <img className="second-bg" src={Couple} alt="Couple Hugging" width="100%" />
      <h2 className="photo-caption">EXPLORE IDEAS AND IMPRESS YOUR DATE!</h2>

      <h6>It's the landing page woo!</h6>
      <Form />
    </div>
  );
}