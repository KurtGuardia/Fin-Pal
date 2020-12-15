import React from 'react';
import { Wallet } from '../../../../assets/images';
import './Banner.scss';

const Banner = () => {
  const year = new Date().getFullYear();
  const day = new Date().getDate();
  const month = new Date().getMonth();

  const formatMonth = (month) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[month];
  };

  const date = `${formatMonth(month)} the ${day}th of ${year}`;

  return (
    <div className='banner'>
      <div className='banner__text'>
        <h1>Welcome Kurt</h1>
        <p className='banner__text--date'>{date}</p>
        <br />
        <p>the best fin app ever!</p>
      </div>
      <Wallet />
    </div>
  );
};

export default Banner;
