import React from 'react';
import { useSelector } from 'react-redux';
import Banner from './components/Banner/Banner';
import Main from './components/Main/Main';
import RecentMovements from './components/RecentMovements/RecentMovements';
import './Dashboard.scss';

const Dashboard = () => {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);

  return (
    <div
      className={isDarkMode ? 'dashboard content dark' : 'dashboard content'}
    >
      <div className='dashboard__left'>
        <Banner />
        <Main />
      </div>
      <div className='dashboard__right'>
        <RecentMovements />
      </div>
    </div>
  );
};

export default Dashboard;
