import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { english, spanish } from '../../languages';
import { formatMoney } from '../../shared/utility';
import './Debts.scss';
import Debt from './components/Debt';
import { Btn } from '../../components/UI';
import { toggleAddDebtModal } from '../../store/actions/settingsActions';
import { Header } from '../../components';

const Debts = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const finance = useSelector((state) => state.finance);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const language = useSelector((state) => state.settings.language);
  const lock = useSelector((state) => state.firebase.profile.isAccountLocked);
  const [content, setContent] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();

  if (!auth.uid) history.push('/auth');

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.debts });
    } else if (language === 'spanish') {
      setContent({ ...spanish.debts });
    }
  }, [language]);

  let totalDebts = 0;
  for (let i = 0; i < finance.debts.length; i++) {
    totalDebts += +finance.debts[i].amount;
  }

  return (
    <>
      {' '}
      <Header />
      <div className='debts content'>
        <div
          className={isDarkMode ? 'debts__container dark' : 'debts__container'}
        >
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
                <Debt key={debt.id} {...debt} />
              ))}
            </ul>
          </div>
        </div>
        {!lock && (
          <Btn
            text={content?.btnText}
            symbol='+'
            clicked={() => dispatch(toggleAddDebtModal())}
          />
        )}
      </div>
    </>
  );
};

export default Debts;
