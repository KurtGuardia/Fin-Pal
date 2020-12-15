import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FinPalCard from '../../../../components/FinPalCard/FinPalCard';
import './Main.scss';
import { english, spanish } from '../../../../languages';
import { Debts2, MoneyBag, Expenses, Debts } from '../../../../assets/icons';

const Main = () => {
  const language = useSelector((state) => state.settings.language);
  const [content, setContent] = useState({});

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.dashboard.main });
    } else if (language === 'spanish') {
      setContent({ ...spanish.dashboard.main });
    }
  }, [language]);

  return (
    <div className='main'>
      <FinPalCard />
      <div className='main__summary'>
        <div className='main__summary--item incomes'>
          <div className='main__summary--icon'>
            <MoneyBag />
          </div>
          <span className='title'>{content.incomes}</span>
          <span className='amount'>€ {content.amount}</span>
        </div>
        <div className='main__summary--item expenses'>
          <div className='main__summary--icon'>
            <Expenses />
          </div>
          <span className='title'>{content.expenses}</span>
          <span className='amount'>€ {content.amount}</span>
        </div>
        <div className='main__summary--item debts'>
          <div className='main__summary--icon'>
            <Debts2 />
          </div>
          <span className='title'>{content.debts}</span>
          <span className='amount'>€ {content.amount}</span>
        </div>
      </div>
    </div>
  );
};

export default Main;
