import React, { useState } from 'react';
import './FinPalCard.scss';
import { ToggleBtn } from '../../components/UI';
import { formatMoney } from '../../shared/utility';

const FinPalCard = ({ amount }) => {
  const [isCardBlock, setIsCardBlock] = useState(false);

  return (
    <div className='finpalCard main__card'>
      <span className='finpalCard__money'>
        <p>
          <p>Balance:</p>
          {formatMoney(amount)[0]}
          <small>{formatMoney(amount)[1]}</small>
        </p>
      </span>
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
