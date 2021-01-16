import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FinPalCard } from '../../../../components';
import './Main.scss';
import { english, spanish } from '../../../../languages';
import { Debts2, MoneyBag, Expenses } from '../../../../assets/icons';
import { formatMoney } from '../../../../shared/utility';
import { motion } from 'framer-motion';

const Main = () => {
  const finance = useSelector((state) => state.finance);
  const language = useSelector((state) => state.settings.language);
  const [content, setContent] = useState({});
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.dashboard.main });
    } else if (language === 'spanish') {
      setContent({ ...spanish.dashboard.main });
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
  let totalDebts = 0;
  for (let i = 0; i < finance.debts.length; i++) {
    totalDebts += +finance.debts[i].amount;
  }

  useEffect(() => {
    let totalBalance = totalIncome - totalExpense;
    setTotal(totalBalance);
  }, [finance, totalIncome, totalExpense]);

  const cardVariants = {
    hidden: {
      x: '-100vw',
    },
    visible: {
      x: '18vw',
      transition: {
        type: 'spring',
        delay: 0.75,
        duration: 0.8,
        stiffness: 50,
      },
    },
  };

  return (
    <div className='main'>
      <motion.div variants={cardVariants}>
        <FinPalCard amount={total} />
      </motion.div>
      <div className='main__summary'>
        <div className='main__summary--item incomes'>
          <div className='main__summary--icon'>
            <MoneyBag />
          </div>
          <span className='title'>{content.incomes}</span>
          <span className='amount'>{formatMoney(totalIncome)}</span>
        </div>
        <div className='main__summary--item expenses'>
          <div className='main__summary--icon'>
            <Expenses />
          </div>
          <span className='title'>{content.expenses}</span>
          <span className='amount'>{formatMoney(totalExpense)}</span>
        </div>
        <div className='main__summary--item debts'>
          <div className='main__summary--icon'>
            <Debts2 />
          </div>
          <span className='title'>{content.debts}</span>
          <span className='amount'>{formatMoney(totalDebts)}</span>
        </div>
      </div>
    </div>
  );
};

export default Main;
