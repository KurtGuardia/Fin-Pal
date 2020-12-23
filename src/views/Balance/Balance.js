import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Btn } from '../../components/UI';
import { english, spanish } from '../../languages';
import { formatMoney } from '../../shared/utility';
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

  let totalIncome = 0;
  for (let i = 0; i < finance.incomes.length; i++) {
    totalIncome += +finance.incomes[i].amount;
  }
  let totalExpense = 0;
  for (let i = 0; i < finance.expenses.length; i++) {
    totalExpense += +finance.expenses[i].amount;
  }

  return (
    <div className='balance content'>
      <div
        className={
          isDarkMode ? 'balance__container dark' : 'balance__container'
        }
      >
        <div className='balance__container--left'>
          <div className='title'>
            <p>{content.incomes}</p>
            <small>{formatMoney(totalIncome)}</small>
          </div>
          <ul className='items'>
            {finance?.incomes?.map((income) => (
              <TransactionItem {...income} />
            ))}
          </ul>
        </div>
        <div className='balance__container--right'>
          <div className='title'>
            <p>{content.expenses}</p>
            <small>{formatMoney(totalExpense)}</small>
          </div>
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
