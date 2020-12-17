import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, TrashCan } from '../../../../assets/icons';
import './TransactionItem.scss';
import {
  removeIncome,
  removeExpense,
} from '../../../../store/actions/financeActions';
import { toggleEditTransactionModal } from '../../../../store/actions/settingsActions';

const TransactionItem = ({ id, type, name, description, amount, date }) => {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    const item = { id, type, name, description, amount, date };

    if (type === 'income') {
      dispatch(removeIncome(item));
    } else if (type === 'expense') {
      dispatch(removeExpense(item));
    }
  };

  const handleEdit = () => {
    const item = { id, type, name, description, amount, date };

    dispatch(toggleEditTransactionModal(item));
  };

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
          <Edit onClick={handleEdit} />
          <TrashCan onClick={handleDelete} />
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
