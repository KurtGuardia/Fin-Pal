import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, TrashCan } from '../../../assets/icons';
import { formatMoney } from '../../../shared/utility';
import { removeItem } from '../../../store/actions/financeActions';
import { toggleEditItemModal } from '../../../store/actions/settingsActions';
import './Item.scss';

const Item = ({
  id,
  type,
  name,
  description,
  totalCost,
  quantity,
  dueDate,
}) => {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const lock = useSelector((state) => state.firebase.profile.isAccountLocked);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const dispatch = useDispatch();

  const getTotal = (quantity, totalCost) => {
    return totalCost / quantity;
  };

  const getUrgency = (dueDate) => {
    const today = new Date();
    const dateToPay = new Date(dueDate);
    const diference = +dateToPay - +today;
    const month = diference / 2629746000;

    if (month <= 1) {
      return 'urgent';
    } else if (month <= 3) {
      return 'mild';
    }
  };

  const handleEdit = () => {
    const item = {
      id,
      type,
      name,
      description,
      totalCost,
      quantity,
      dueDate,
    };
    dispatch(toggleEditItemModal(item));
  };

  const handleDelete = () => {
    const item = {
      id,
      type,
      name,
      description,
      totalCost,
      quantity,
      dueDate,
    };
    dispatch(removeItem(item));
  };

  return (
    <li
      className={
        isDarkMode
          ? `item dark ${getUrgency(dueDate)}`
          : `item ${getUrgency(dueDate)}`
      }
      onClick={() => setIsItemOpen(!isItemOpen)}
    >
      <div className='item__concept'>
        <p className={isItemOpen ? 'open' : ''}>{name}</p>
        {isItemOpen && <small>{description}</small>}
      </div>
      <div className='item__extra'>
        <p className='quantity'>{quantity}</p>
        <p className='cost-total'>{formatMoney(totalCost)}</p>
        <p className='cost-unit'>
          {formatMoney(getTotal(quantity, totalCost))}
        </p>
        <p className='dueDate'>{dueDate}</p>
      </div>
      <div className='item__icons'>
        {!lock && (
          <>
            {' '}
            <Edit onClick={handleEdit} />
            <TrashCan onClick={handleDelete} />{' '}
          </>
        )}
      </div>
    </li>
  );
};

export default Item;
