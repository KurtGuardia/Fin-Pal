import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, TrashCan } from '../../../assets/icons';
import { formatMoney } from '../../../shared/utility';
// import { removeDebt } from '../../../store/actions/financeActions';
// import { toggleEditDebtModal } from '../../../store/actions/settingsActions';
import './Article.scss';

const Article = ({
  id,
  type,
  name,
  description,
  totalCost,
  quantity,
  dueDate,
}) => {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
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
    // dispatch(toggleEditDebtModal(item));
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
    // dispatch(removeDebt(item));
  };

  return (
    <li
      className={
        isDarkMode
          ? `article dark ${getUrgency(dueDate)}`
          : `article ${getUrgency(dueDate)}`
      }
      onClick={() => setIsItemOpen(!isItemOpen)}
    >
      <div className='article__concept'>
        <p>{name}</p>
        {isItemOpen && <p>{description}</p>}
      </div>
      <div className='article__extra'>
        <p className='quantity'>{quantity}</p>
        <p className='cost-total'>{formatMoney(totalCost)}</p>
        <p className='cost-unit'>
          {formatMoney(getTotal(quantity, totalCost))}
        </p>
        <p className='dueDate'>{dueDate}</p>
      </div>
      <div className='article__icons'>
        <Edit onClick={handleEdit} />
        <TrashCan onClick={handleDelete} />
      </div>
    </li>
  );
};

export default Article;
