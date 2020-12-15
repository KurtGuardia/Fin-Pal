import React from 'react';
import FinPalCard from '../../../../components/FinPalCard/FinPalCard';
import './Main.scss';

const Main = () => {
  return (
    <div className='main'>
      <FinPalCard />
      <div className='main__summary'>
        <div className='main__summary--item'>1</div>
        <div className='main__summary--item'>2</div>
        <div className='main__summary--item'>3</div>
      </div>
    </div>
  );
};

export default Main;
