import React, { useState } from 'react';
import './FinPalCard.scss';
import { ToggleBtn } from '../../components/UI';

const FinPalCard = () => {
  const [isCardBlock, setIsCardBlock] = useState(false);

  return (
    <div className='finpalCard main__card'>
      <span className='finpalCard__money'>€ 69.69</span>
      <span className='finpalCard__btn'>
        <ToggleBtn
          isToggleOn={isCardBlock}
          changeToggle={() => setIsCardBlock(!isCardBlock)}
        />
      </span>
    </div>
  );
};

export default FinPalCard;
