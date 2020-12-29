import React, { useState } from 'react';
import './FinPalCard.scss';
import { ToggleBtn } from '../../components/UI';
import { formatMoney } from '../../shared/utility';
import { toggleLockAccountModal } from '../../store/actions/settingsActions';
import { useDispatch } from 'react-redux';

const FinPalCard = ({ amount }) => {
  const [isCardBlock, setIsCardBlock] = useState(false);
  const dispatch = useDispatch();

  const toggleLockAccount = () => {
    setIsCardBlock(true);
    dispatch(toggleLockAccountModal());
  };

  return (
    <div className='finpalCard main__card'>
      <span className='finpalCard__money'>
        <p>Balance:</p>
        {formatMoney(amount)[0]}
        <small>{formatMoney(amount)[1]}</small>
      </span>
      <span className='finpalCard__btn'>
        <ToggleBtn
          isToggleOn={isCardBlock}
          changeToggle={() => toggleLockAccount()}
        />
      </span>
    </div>
  );
};

export default FinPalCard;
