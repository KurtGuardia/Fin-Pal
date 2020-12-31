import React, { useEffect, useState } from 'react';
import { formatMoney } from '../../../../../shared/utility';
import { english, spanish } from '../../../../../languages';
import { useSelector } from 'react-redux';

const RecentMovement = ({ index }) => {
  const language = useSelector((state) => state.settings.language);
  const profile = useSelector((state) => state.firebase.profile);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  let date;
  let amount;

  useEffect(() => {
    if (language === 'english') {
      setContent(english.dashboard.recentMovements);
    } else if (language === 'spanish') {
      setContent(spanish.dashboard.recentMovements);
    }
  }, [language]);

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
