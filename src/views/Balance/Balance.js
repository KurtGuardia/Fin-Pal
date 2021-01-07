import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Btn } from '../../components/UI';
import { Header } from '../../components';
import { english, spanish } from '../../languages';
import { formatMoney } from '../../shared/utility';
import { toggleAddTransactionModal } from '../../store/actions/settingsActions';
import './Balance.scss';
import TransactionItem from './components/TransactionItem/TransactionItem';
import { Revenue } from '../../assets/images';

const Balance = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const finance = useSelector((state) => state.finance);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const language = useSelector((state) => state.settings.language);
  const lock = useSelector((state) => state.firebase.profile.isAccountLocked);
  const [content, setContent] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  if (!auth.uid) history.push('/auth');

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.balance });
    } else if (language === 'spanish') {
      setContent({ ...spanish.balance });
    }
  }, [language]);

  const getSearchTerm = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  let totalIncome = 0;
  for (let i = 0; i < finance.incomes.length; i++) {
    totalIncome += +finance.incomes[i].amount;
  }
  let totalExpense = 0;
  for (let i = 0; i < finance.expenses.length; i++) {
    totalExpense += +finance.expenses[i].amount;
  }

  let searchIncArr = finance?.incomes;
  let searchExpArr = finance?.expenses;

  if (searchTerm !== '') {
    searchIncArr = finance?.incomes?.filter((item) =>
      item.name.includes(searchTerm)
    );
    searchExpArr = finance?.expenses?.filter((item) =>
      item.name.includes(searchTerm)
    );
  }

  return (
    <>
      {' '}
      <Header getSearchTerm={getSearchTerm} />
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
              {searchIncArr.map((income) => (
                <TransactionItem key={income.id} {...income} />
              ))}
            </ul>
          </div>
          <div className='balance__container--right'>
            <div className='title'>
              <p>{content.expenses}</p>
              <small>{formatMoney(totalExpense)}</small>
            </div>
            <ul className='items'>
              {searchExpArr.map((expense) => (
                <TransactionItem key={expense.id} {...expense} />
              ))}
            </ul>
          </div>
        </div>
        {!lock && (
          <Btn
            text={content?.btnText}
            symbol='+'
            clicked={() => dispatch(toggleAddTransactionModal())}
          />
        )}{' '}
        <Revenue className='balance__icon' />
      </div>
    </>
  );
};

export default Balance;
