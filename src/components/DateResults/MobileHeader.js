import React from 'react';
import IconBulb from '../../assets/Icon_White.svg';
import FilterBtn from '../../assets/Settings.svg';
import ShuffleBtn from '../../assets/Shuffle.svg';

export default function MobileHeader() {
    return (
        <div className='mobile-header'>
            <img className="logo-bulb" src={IconBulb} alt="Home Logo" height="75px" />
            <div className="right-icons">
                <img className="filter-btn" src={FilterBtn} alt="Filter Button" height="80px" />
                <img className="shuffle-btn" src={ShuffleBtn} alt="Shuffle Button" height="80px" />
            </div>
        </div>
    );
}