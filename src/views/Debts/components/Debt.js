import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, TrashCan } from '../../../assets/icons';
import { formatMoney } from '../../../shared/utility';
import './Debt.scss';

const Debt = () => {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <li
      className={isDarkMode ? 'debt dark' : 'debt'}
      onClick={() => setIsItemOpen(!isItemOpen)}
    >
      <div className='debt__concept'>
        <p>Deuda</p>
        {isItemOpen && <p>Concepto de la deuda</p>}
      </div>
      <div className='debt__extra'>
        <p className='amount'>{formatMoney(2355345.44)}</p>
        <p className='dueDate'>01/26/2021</p>
        <p className='liqTime'>1 mes, 1 dia</p>
      </div>
      <div className='debt__icons'>
        <Edit onClick={handleEdit} />
        <TrashCan onClick={handleDelete} />
      </div>
    </li>
  );
};

export default Debt;
