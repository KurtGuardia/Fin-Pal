import React from 'react';
import { useSelector } from 'react-redux';
import './Balance.scss';
import Income from './components/Income/Income';
import Expense from './components/Expense/Expense';

const Balance = () => {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);

  return (
    <div className={isDarkMode ? 'balance dark content' : 'balance content'}>
      <div className='balance__content'>
        <div className='balance__content--left'>
          <div className='title'>Incomes</div>
          <ul className='items'>
            <Income />
            <Income />
            <Income />
          </ul>
        </div>
        <div className='balance__content--right'>
          <div className='title'>Expenses</div>
          <ul className='items'>
            <Expense />
            <Expense />
          </ul>
        </div>
      </div>
      <button className='balance__btn'>+ Add transaction</button>
    </div>
  );
};

export default Balance;
