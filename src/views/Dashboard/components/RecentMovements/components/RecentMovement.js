import React, { useState } from 'react';
import { formatMoney } from '../../../../../shared/utility';
import { useSelector } from 'react-redux';

const RecentMovement = ({ index }) => {
  const profile = useSelector((state) => state.firebase.profile);
  const [isOpen, setIsOpen] = useState(false);
  let date;
  let amount;

  const type = () => {
    if (profile.recentMovements[index].info.type === 'income') {
      return 'recentMoventIncome';
    } else if (profile.recentMovements[index].info.type === 'expense') {
      return 'recentMoventExpense';
    } else if (profile.recentMovements[index].info.type === 'stock') {
      return 'recentMoventStock';
    } else if (profile.recentMovements[index].info.type === 'debt') {
      return 'recentMoventDebt';
    }
  };

  const displayDate = () => {
    if (profile.recentMovements[index].info.date) {
      date = profile.recentMovements[index].info.date;
    } else if (profile.recentMovements[index].info.dueDate) {
      date = profile.recentMovements[index].info.dueDate;
    }
  };
  displayDate();

  const displayAmount = () => {
    if (profile.recentMovements[index].info.amount) {
      amount = profile.recentMovements[index].info.amount;
    } else if (profile.recentMovements[index].info.totalCost) {
      amount = profile.recentMovements[index].info.totalCost;
    }
  };
  displayAmount();

  return (
    <li
      className={`recentMovements__content--item ${type()}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className='face'>
        <div className='text'>
          <span className='name'>
            {profile.recentMovements[index].info.type}
          </span>
          <small className='type'>{profile.recentMovements[index].type}</small>
        </div>
        <span className='amount'>{formatMoney(amount)}</span>
      </div>
      {isOpen && (
        <div className='extra'>
          <span>{profile.recentMovements[index].info.name} </span>
          <small className='date'>| {date}</small>
        </div>
      )}
    </li>
  );
};

export default RecentMovement;
