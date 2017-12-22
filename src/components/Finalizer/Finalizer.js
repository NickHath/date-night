import React, { Component } from 'react';
import Star from '../../assets/Star.svg';
import Clock from '../../assets/Start.svg';
import TestPic from '../../assets/Couple.png';
import Lock from '../../assets/Lock.svg';
import Arrow from '../../assets/Arrow.svg';
import logo from '../../assets/Icon.svg';

export default function Finalizer (props) {


    return (
        <div className='summary-card'>
            <div className="summary-top">
                <div className="summary-price">{props.date.price}</div>
                <div className="summary-ratings">
                    <div className="summary-rating-number">{props.date.rating}</div>
                    <img className="Star" src={Star} alt="Star Icon" height="25px" />
                </div>
            </div>
            <div className="middle-section">
                <img className="yelp-summary"  src={props.date.image_url ? props.date.image_url : logo} alt="YELP Place" /> 
            </div>
            <div className="location-header">
                <p className="yelp-title-name">{props.date.name}</p>
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
                    <div className="summary-response">{props.date.categories[0].title}</div>
                    <div className="summary-response">{props.date.display_phone}</div>
                    <div className="summary-response">{props.date.location.display_address[0]}</div>
                    <div className="summary-response">{props.date.location.display_address[1]}</div>
                    <div className="summary-response">{props.date.location.display_address[2]}</div>
                </div>
            </div>
            <div className="gray-box">
                <div className="start-text">Time Est.</div>
                <div className="start-response">1-2 Hrs</div>
            </div>
        </div>
    );
}

