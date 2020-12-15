import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './RecentMovements.scss';
import { english, spanish } from '../../../../languages';

const RecentMovements = () => {
  const language = useSelector((state) => state.settings.language);
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
      <h2>{content}</h2>
    </div>
  );
};

export default RecentMovements;
