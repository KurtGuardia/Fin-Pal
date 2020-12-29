import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Banner from './components/Banner/Banner';
import Main from './components/Main/Main';
import RecentMovements from './components/RecentMovements/RecentMovements';
import './Dashboard.scss';
import { Header } from '../../components';
import { Chart } from '../../assets/images';

const Dashboard = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const history = useHistory();

  if (!auth.uid) history.push('/auth');

  return (
    <>
      <Header />
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
    </>
  );
};

export default Dashboard;
