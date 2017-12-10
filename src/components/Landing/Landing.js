import React from 'react';
import Form from './Form';
import Mobile_Ocean from '../../assets/Mobile_Ocean.svg';
import Logo_White from '../../assets/Logo_White.svg';
import Clipboard from '../../assets/Clipboard.svg';
import Shuffle from '../../assets/Shuffle.svg';
import Calendar from '../../assets/Calendar.svg';
import Logo_Icon from '../../assets/Icon.svg';
import Couple from '../../assets/Couple.png';
// import TextField from 'material-ui/TextField';
// import DatePicker from 'material-ui/DatePicker';
// import TimePicker from 'material-ui/TimePicker';
// import Slider from 'material-ui/Slider';



export default function Landing() {
  return (
    <div className='landing'>
      <div className="first-bg-box">
        <img className="first-bg" src={Mobile_Ocean} alt="Ocean Kayaking Date" width="100%" />
        <img className="logo" src={Logo_White} alt="Date Idea Generator Logo" />
      </div>
      <div className="header-bar"></div>
      <div className = "text-wrapper">
        <h1>HOW DOES </h1> 
        <h1>IT WORK?</h1>
      </div>
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
        <img className="logo-icon" src={Logo_Icon} alt="Date Idea Generator Icon" />
        <div className="line"></div>
      </div>
      <div className = "img-wrapper"><img className="second-bg" src={Couple} alt="Couple Hugging" /></div>
      {/* <h2 className="photo-caption">EXPLORE IDEAS AND IMPRESS YOUR DATE!</h2> */}

      <Form />
      {/* <div className="date-form">
        <h1>CREATE YOUR PERFECT DATE!</h1>
        <h3>START DATE</h3>
        <DatePicker hintText="01/12/2017" />
        <h3>START TIME</h3>
        <TimePicker hintText="12hr Format" />
        <h3>LENGTH</h3>
        <h4 className="gray-text">1 HOUR</h4>
        <button className="second-btn">SHORT</button>
        <h4 className="gray-text">2-4 HOURS</h4>
        <button className="second-btn">MEDIUM</button>
        <h4 className="gray-text">5-8 HOURS</h4>
        <button className="second-btn">LONG</button>
        <h3>LOCATION</h3>
        <TextField hintText="Provo, UT"/>
        <h3>RADIUS</h3>
        <Slider defaultValue={25} />
        <button className="main-btn">CREATE</button>
      </div> */}

    </div>
  );
}