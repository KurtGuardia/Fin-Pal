import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Banner from './components/Banner/Banner';
import Main from './components/Main/Main';
import RecentMovements from './components/RecentMovements/RecentMovements';
import './Dashboard.scss';
import { Header } from '../../components';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const history = useHistory();

  if (!auth.uid) history.push('/auth');

  const getSearchTerm = () => {
    return null;
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <>
      <Header getSearchTerm={getSearchTerm} />
      <div
        className={isDarkMode ? 'dashboard content dark' : 'dashboard content'}
      >
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='dashboard__left'
        >
          <Banner />
          <Main />
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='dashboard__right'
        >
          <RecentMovements />
        </motion.div>
      </div>
    </>
  );
};

export default Dashboard;
