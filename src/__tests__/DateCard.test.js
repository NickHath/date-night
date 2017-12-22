import React from 'react'
import DateCard from '../components/DateResults/DateCard';
import { isFunction } from 'util';

describe('DateCard component', () => {
  describe('convertTime functions correctly', () => {

    test('should be a function', () => {

      let d = new DateCard({ time: NaN });
      // Act
      
      let result = typeof(d.convertTime);
      console.log(result)
      expect( result).toBe('function')
    })

    test('convertTime works with no time provided', () => {
      // Arrange
      let d = new DateCard({ time: NaN });
      // Act
      let result = d.convertTime();
      // Assert
      expect(result).toBe('1-2 hrs');
    });
    test('convertTime works with AM times', () => {
      // Arrange
      let d = new DateCard({ time: 800 });
      // Act
      let result = d.convertTime();
      // Assert
      expect(result).toBe('8:00 am');
    });
    test('convertTime works with PM times', () => {
      // Arrange
      let d = new DateCard({ time: 1430 });
      // Act
      let result = d.convertTime();
      // Assert
      expect(result).toBe('2:30 pm');
    });
  });
});
