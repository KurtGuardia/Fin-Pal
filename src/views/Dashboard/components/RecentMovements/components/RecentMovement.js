import React, { useEffect, useState } from 'react';
import { formatMoney } from '../../../../../shared/utility';
import { english, spanish } from '../../../../../languages';
import { useSelector } from 'react-redux';

const RecentMovement = ({ index }) => {
  const language = useSelector((state) => state.settings.language);
  const profile = useSelector((state) => state.firebase.profile);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (language === 'english') {
      setContent(english.dashboard.recentMovements);
    } else if (language === 'spanish') {
      setContent(spanish.dashboard.recentMovements);
    }
  }, [language]);

  const type = () => {
    if (profile.recentMovements[index].info.type === 'income') {
      return 'income';
    } else if (profile.recentMovements[index].info.type === 'expense') {
      return 'expense';
    } else if (profile.recentMovements[index].info.type === 'stock') {
      return 'stock';
    } else if (profile.recentMovements[index].info.type === 'debt') {
      return 'debt';
    }
  };

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
          <small className='date'>
            | {profile.recentMovements[index].info.date}
          </small>
        </div>
      )}
    </li>
  );
};

export default RecentMovement;
