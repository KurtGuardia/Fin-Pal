import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Btn } from '../../components/UI';
import { english, spanish } from '../../languages';
import { toggleAddTransactionModal } from '../../store/actions/settingsActions';
import './Balance.scss';
import TransactionItem from './components/TransactionItem/TransactionItem';

const Balance = () => {
  const finance = useSelector((state) => state.finance);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const language = useSelector((state) => state.settings.language);
  const [content, setContent] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.balance });
    } else if (language === 'spanish') {
      setContent({ ...spanish.balance });
    }
  }, [language]);

  return (
    <div className='balance content'>
      <div
        className={
          isDarkMode ? 'balance__container dark' : 'balance__container'
        }
      >
        <div className='balance__container--left'>
          <div className='title'>{content.incomes}</div>
          <ul className='items'>
            {finance?.incomes?.map((income) => (
              <TransactionItem key={income.id} {...income} />
            ))}
          </ul>
        </div>
        <div className='balance__container--right'>
          <div className='title'>{content.expenses}</div>
          <ul className='items'>
            {finance?.expenses?.map((expense) => (
              <TransactionItem key={expense.id} {...expense} />
            ))}
          </ul>
        </div>
      </div>
      <Btn
        text={content?.btnText}
        symbol='+'
        clicked={() => dispatch(toggleAddTransactionModal())}
      />
    </div>
  );
};

export default Balance;
