import React, { useEffect, useState } from 'react';
import { formatMoney } from '../../../../../shared/utility';
import { useSelector } from 'react-redux';
import { english, spanish } from '../../../../../languages';

const RecentMovement = ({ index }) => {
  const profile = useSelector((state) => state.firebase.profile);
  const [isOpen, setIsOpen] = useState(false);
  let date;
  let amount;
  const language = useSelector((state) => state.settings.language);
  const [content, setContent] = useState('');
  let category;

  useEffect(() => {
    if (language === 'english') {
      setContent(english.dashboard.recentMovements);
    } else if (language === 'spanish') {
      setContent(spanish.dashboard.recentMovements);
    }
  }, [language]);

  const type = () => {
    if (profile.recentMovements[index].info.type === 'income') {
      category = content.income;
      return 'recentMoventIncome';
    } else if (profile.recentMovements[index].info.type === 'expense') {
      category = content.expense;
      return 'recentMoventExpense';
    } else if (profile.recentMovements[index].info.type === 'stock') {
      category = content.stock;
      return 'recentMoventStock';
    } else if (profile.recentMovements[index].info.type === 'debt') {
      category = content.debt;
      return 'recentMoventDebt';
    }
  };

  const movementType = () => {
    if (profile.recentMovements[index].type === 'added') {
      if (profile.recentMovements[index].info.type === 'debt') {
        return content.debtAdded;
      } else {
        return content.added;
      }
    } else if (profile.recentMovements[index].type === 'removed') {
      if (profile.recentMovements[index].info.type === 'debt') {
        return content.debtAdded;
      } else {
        return content.removed;
      }
    } else if (profile.recentMovements[index].type === 'edited') {
      if (profile.recentMovements[index].info.type === 'debt') {
        return content.debtAdded;
      } else {
        return content.edited;
      }
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
          <span className='name'>{category}</span>
          <small className='type'>{movementType()}</small>
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
