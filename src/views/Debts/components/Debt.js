import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, TrashCan } from '../../../assets/icons';
import { english, spanish } from '../../../languages';
import { formatMoney } from '../../../shared/utility';
import { removeDebt } from '../../../store/actions/financeActions';
import { toggleEditDebtModal } from '../../../store/actions/settingsActions';
import './Debt.scss';

const Debt = ({ id, type, name, description, amount, dueDate }) => {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const lock = useSelector((state) => state.firebase.profile.isAccountLocked);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const language = useSelector((state) => state.settings.language);
  const [content, setContent] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.debts });
    } else if (language === 'spanish') {
      setContent({ ...spanish.debts });
    }
  }, [language]);

  const getLiqTime = (dueDate) => {
    const today = new Date();
    const dateToPay = new Date(dueDate);
    const diference = +dateToPay - +today;
    let years = Math.floor(diference / 31536000000);
    let months = Math.floor((diference % 31536000000) / 2629746000);
    let days = Math.ceil(((diference % 31536000000) % 2629746000) / 86400000);

    if (diference < 0) return `${content.expired}`;

    if (!years) {
      years = null;
    } else {
      years = `${content.years}: ${years} |`;
    }
    if (!months) {
      months = null;
    } else {
      months = `${content.months}: ${months} |`;
    }

    return `${years ? years : ''} ${months ? months : ''}  ${
      content.days
    }: ${days}`;
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
    const item = { id, type, name, description, amount, dueDate };
    dispatch(toggleEditDebtModal(item));
  };

  const handleDelete = () => {
    const item = { id, type, name, description, amount, dueDate };
    dispatch(removeDebt(item));
  };

  return (
    <li
      className={
        isDarkMode
          ? `debt dark ${getUrgency(dueDate)}`
          : `debt ${getUrgency(dueDate)}`
      }
      onClick={() => setIsItemOpen(!isItemOpen)}
    >
      <div className='debt__concept'>
        <p>{name}</p>
        {isItemOpen && <p>{description}</p>}
      </div>
      <div className='debt__extra'>
        <p className='amount'>{formatMoney(amount)}</p>
        <p className='dueDate'>{dueDate}</p>
        <p className='liqTime'>{getLiqTime(dueDate)}</p>
      </div>
      <div className='debt__icons'>
        {!lock && (
          <>
            <Edit onClick={handleEdit} />
            <TrashCan onClick={handleDelete} />
          </>
        )}
      </div>
    </li>
  );
};

export default Debt;
