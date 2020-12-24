import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { english, spanish } from '../../languages';
import { formatMoney } from '../../shared/utility';
import './Debts.scss';
import Debt from './components/Debt';

const Debts = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const finance = useSelector((state) => state.finance);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const language = useSelector((state) => state.settings.language);
  const [content, setContent] = useState({});
  const history = useHistory();
  console.log(finance);

  if (!auth.uid) history.push('/auth');

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.debts });
    } else if (language === 'spanish') {
      setContent({ ...spanish.debts });
    }
  }, [language]);

  let totalDebts = 1542.451;

  return (
    <div className='debts content'>
      <div className='debts__container'>
        <div className='debts__container--title'>
          <p>{content.debts}</p>
          <small>{formatMoney(totalDebts)}</small>
        </div>
        <div className='debts__container--subtitle'>
          <p>{content.concept}</p>
          <p className='amount'>{content.amount}</p>
          <p className='dueDate'>{content.dueDate}</p>
          <p className='liqTime'>{content.liqTime}</p>
        </div>
        <div className='debts__container--content'>
          <ul className='items'>
            {finance?.debts?.map((debt) => (
              <Debt {...debt} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Debts;
