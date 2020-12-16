import React from 'react';
import { useSelector } from 'react-redux';
import './Balance.scss';

const Balance = () => {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);

  return (
    <div className={isDarkMode ? 'balance dark content' : 'balance content'}>
      <div className='balance__content'>
        <div className='balance__content--left'>
          <div className='title'>Incomes</div>
          <ul className='items'>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
          </ul>
        </div>
        <div className='balance__content--right'>
          <div className='title'>Expenses</div>
          <ul className='items'>
            <li>item</li>
            <li>item</li>
          </ul>
        </div>
      </div>
      <button className='balance__btn'>+ Add transaction</button>
    </div>
  );
};

export default Balance;
