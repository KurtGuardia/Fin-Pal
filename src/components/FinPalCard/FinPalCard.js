import React from 'react';
import './FinPalCard.scss';
import ToggleBtn from '../../components/UI/ToggleBtn/ToggleBtn';

const FinPalCard = () => {
  return (
    <div className='finpalCard main__card'>
      <span className='finpalCard__money'>$ 69.69</span>
      <span className='finpalCard__btn'>
        <ToggleBtn />
      </span>
    </div>
  );
};

export default FinPalCard;
