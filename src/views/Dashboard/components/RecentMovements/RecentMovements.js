import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './RecentMovements.scss';
import { english, spanish } from '../../../../languages';
import RecentMovement from './components/RecentMovement';

const RecentMovements = () => {
  const language = useSelector((state) => state.settings.language);
  const profile = useSelector((state) => state.firebase.profile);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (language === 'english') {
      setContent(english.dashboard.recentMovements);
    } else if (language === 'spanish') {
      setContent(spanish.dashboard.recentMovements);
    }
  }, [language]);

  return (
    <div className='recentMovements'>
      <h2 className='recentMovements__title'>{content}</h2>
      <ul
        className={
          isDarkMode
            ? 'recentMovements__content dark'
            : 'recentMovements__content'
        }
      >
        {profile.recentMovements &&
          profile.recentMovements.map((recentMovementItem, index) => {
            return (
              <RecentMovement index={index} key={recentMovementItem.info.id} />
            );
          })}
      </ul>
    </div>
  );
};

export default RecentMovements;
