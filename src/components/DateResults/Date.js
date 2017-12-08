import React from 'react';
import DateDetails from './DateDetails';
import DateCard from './DateCard';

export default function Date() {
  return (
    <div className='date'>
      <h1>Main view for date location/event</h1>
      <DateDetails/>
    </div>
  );
}