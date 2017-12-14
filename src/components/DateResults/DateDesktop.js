import React from 'react';
import Logo from '../../assets/Icon.svg';
import SideNav from './SideNav';
import Date from './Date';

export default function DateDesktop() {
  return (
    <div className='date-desktop'>
      <SideNav />
      <div className="date-column">
        <Date />
        <Date />
        <Date />
      </div>
    </div>
  );
}
