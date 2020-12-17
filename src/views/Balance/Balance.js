import React from 'react';
import { useSelector } from 'react-redux';
import './Balance.scss';
import TransactionItem from './components/TransactionItem/TransactionItem';

const Balance = () => {
  const finance = useSelector((state) => state.finance);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);

  return (
    <div className='balance content'>
      <div
        className={
          isDarkMode ? 'balance__container dark' : 'balance__container'
        }
      >
        <div className='balance__container--left'>
          <div className='title'>Incomes</div>
          <ul className='items'>
            {finance?.incomes?.map((income) => (
              <TransactionItem key={income.id} {...income} />
            ))}
          </ul>
        </div>
        <div className='balance__container--right'>
          <div className='title'>Expenses</div>
          <ul className='items'>
            {finance?.expenses?.map((expense) => (
              <TransactionItem key={expense.id} {...expense} />
            ))}
          </ul>
        </div>
      </div>
      <button className='balance__btn'>+ Add transaction</button>
    </div>
  );
};

export default Balance;
