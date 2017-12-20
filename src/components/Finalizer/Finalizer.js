import React, { Component } from 'react';
import Star from '../../assets/Star.svg';
import Clock from '../../assets/Start.svg';
import TestPic from '../../assets/Couple.png';
import Lock from '../../assets/Lock.svg';
import Arrow from '../../assets/Arrow.svg';
import logo from '../../assets/Icon.svg';

export default class Finalizer extends Component {

    render() {
        return (
            <div className='summary-card'>
                <div className="summary-top">
                    <div className="summary-price">$$$</div>
                    <div className="summary-ratings">
                        <div className="summary-rating-number">4.5</div>
                        <img className="Star" src={Star} alt="Star Icon" height="25px" />
                    </div>
                </div>
                <div className="middle-section">
                    <img className="yelp-summary" src={TestPic} alt="YELP Place" />
                </div>
                <div className="location-header">
                    <p className="yelp-title-name">Nick's Jumbo Burgers</p>
                </div>
                <div className="gray-bar"></div>
                <div className="summary-data-box">
                    <div className="summary-data-labels">
                        <div className="summary-text">TYPE:</div>
                        <div className="summary-text">PHONE:</div>
                        <div className="summary-text">ADDRESS:</div>
                        <div className="summary-text"></div>
                    </div>
                    <div className="summary-data-response">
                        <div className="summary-response">American</div>
                        <div className="summary-response">555-555-5555</div>
                        <div className="summary-response">1234 Provo Street</div>
                        <div className="summary-response">Salt Lake City, 84043</div>
                        <div className="summary-response"></div>
                    </div>
                </div>
                <div className="gray-box">
                    <div className="start-text">START TIME:</div>
                    <div className="start-response">4:30PM</div>
                </div>
            </div>
        );
    }
}
