import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Wallet } from '../../../../assets/images';
import './Banner.scss';
import { english, spanish } from '../../../../languages';

const Banner = () => {
  const profile = useSelector((state) => state.firebase.profile);
  const language = useSelector((state) => state.settings.language);
  const [content, setContent] = useState({});

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.dashboard.banner });
    } else if (language === 'spanish') {
      setContent({ ...spanish.dashboard.banner });
    }
  }, [language]);

  const year = new Date().getFullYear();
  const day = new Date().getDate();
  const month = new Date().getMonth();

  const formatMonth = (month) => {
    const months = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];
    return months[month];
  };

  const date = ` ${day} / ${formatMonth(month)} / ${year}`;

  return (
    <div className='banner'>
      <div className='banner__text'>
        <h1>
          {content.title} {profile.firstName}
        </h1>
        <p className='banner__text--date'>
          {content.today}: {date}
        </p>
        <br />
        <p>{content.text}</p>
      </div>
      <Wallet />
    </div>
  );
};

export default Banner;
