import React, { useState } from 'react';
import './FinPalCard.scss';
import { ToggleBtn } from '../../components/UI';
import { formatMoney } from '../../shared/utility';
import { toggleLockAccountModal } from '../../store/actions/settingsActions';
import { useDispatch, useSelector } from 'react-redux';

const FinPalCard = ({ amount }) => {
  const isAccountLocked = useSelector(
    (state) => state.firebase.profile.isAccountLocked
  );
  const dispatch = useDispatch();

  return (
    <div className='finpalCard main__card'>
      <span className='finpalCard__money'>
        <p>Balance:</p>
        {formatMoney(amount)[0]}
        <small>{formatMoney(amount)[1]}</small>
      </span>
      <span className='finpalCard__btn'>
        <ToggleBtn
          isToggleOn={isAccountLocked}
          changeToggle={() => dispatch(toggleLockAccountModal())}
        />
      </span>
    </div>
  );
};

export default FinPalCard;
