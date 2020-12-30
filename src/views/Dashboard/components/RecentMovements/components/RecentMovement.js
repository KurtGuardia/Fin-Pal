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

  return (
    <li
      className={`recentMovements__content--item ${type()}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className='face'>
        <span className='name'>{profile.recentMovements[index].info.name}</span>
        {isOpen && (
          <small className='type'>{profile.recentMovements[index].type}</small>
        )}
        <span className='amount'>
          {formatMoney(profile.recentMovements[index].info.amount)}
        </span>
      </div>
      {isOpen && (
        <div className='extra'>
          <span>{profile.recentMovements[index].info.description} </span>
          <small className='date'>| {date}</small>
        </div>
      )}
    </li>
  );
};

export default RecentMovement;
