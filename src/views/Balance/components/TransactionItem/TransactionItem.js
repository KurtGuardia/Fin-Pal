import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, TrashCan } from '../../../../assets/icons';
import './TransactionItem.scss';

const TransactionItem = ({ type, name, description, amount, date }) => {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <li
      className={
        type === 'income'
          ? `transaction-item income ${isDarkMode && 'dark'}`
          : `transaction-item expense ${isDarkMode && 'dark'}`
      }
      onClick={() => setIsItemOpen(!isItemOpen)}
    >
      <div className='transaction-item__face'>
        <span className='transaction-item__face--name'>{name}</span>
        <span className='transaction-item__face--amount'>{amount}</span>
        <div className='transaction-item__face--icons'>
          <Edit />
          <TrashCan />
        </div>
      </div>
      {isItemOpen && (
        <div className='transaction-item__data'>
          <p className='transaction-item__data--note'>{description}</p>
          <p className='transaction-item__data--date'>{date}</p>
        </div>
      )}
    </li>
  );
};

export default TransactionItem;
