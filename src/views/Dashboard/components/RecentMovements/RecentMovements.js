import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './RecentMovements.scss';
import { english, spanish } from '../../../../languages';
import RecentMovement from './components/RecentMovement';

const RecentMovements = () => {
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

  return (
    <div className='recentMovements'>
      <h2 className='recentMovements__title'>Recent Movements</h2>
      <ul className='recentMovements__content'>
        {profile.recentMovements.map((recentMovementItem, index) => {
          return <RecentMovement index={index} />;
        })}
      </ul>
    </div>
  );
};

export default RecentMovements;
