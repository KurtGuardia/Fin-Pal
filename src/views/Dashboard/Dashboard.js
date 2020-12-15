import React from 'react';
import Banner from './components/Banner/Banner';
import Main from './components/Main/Main';
import RecentMovements from './components/RecentMovements/RecentMovements';
import './Dashboard.scss';

const Dashboard = () => {
  return (
    <div className='dashboard content'>
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
