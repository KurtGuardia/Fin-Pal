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
import { Business } from '../../assets/images';
import { DatePicker } from '../../components';
import { motion } from 'framer-motion';

const Debts = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const finance = useSelector((state) => state.finance);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const language = useSelector((state) => state.settings.language);
  const lock = useSelector((state) => state.firebase.profile.isAccountLocked);
  const [content, setContent] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [totalDebts, setTotalDebts] = useState([]);
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

  function sum(total, num) {
    return total + num;
  }

  const debtsTotalArr = [];
  useEffect(() => {
    setTotalDebts(debtsTotalArr.reduce(sum, 0));
    // eslint-disable-next-line
  });

  let debts = finance?.debts;
  if (searchTerm !== '') {
    debts = finance?.debts?.filter((item) => item.name.includes(searchTerm));
  }

  const getDate = (date) => {
    setSelectedDate(date);
  };

  const getSearchTerm = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const iconVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  const contentVariants = {
    hidden: {
      y: '-100vw',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 13,
      },
    },
  };

  return (
    <>
      <Header getSearchTerm={getSearchTerm} />
      <DatePicker getDate={getDate} selectedDate={selectedDate} />
      <div className='debts content'>
        <motion.div
          variants={contentVariants}
          initial='hidden'
          animate='visible'
          exit='hidden' //Even though it is not working. Due tu huge bug while logging in and out.
          className={isDarkMode ? 'debts__container dark' : 'debts__container'}
        >
          <div className='debts__container--title'>
            <p>{content.debts}</p>
            <small>{formatMoney(totalDebts)}</small>
          </div>

          <div className='debts__container--content'>
            <div className='debts__container--subtitle'>
              {/* I had to set the subtitle here when making it responsive in tablets and mobile due to neccessity on scrolling  */}
              <p>{content.concept}</p>
              <p className='amount'>{content.amount}</p>
              <p className='dueDate'>{content.dueDate}</p>
              <p className='liqTime'>{content.liqTime}</p>
            </div>
            <ul className='items'>
              {!selectedDate ||
              selectedDate === 'Show All' ||
              selectedDate === 'Mostrar Todo'
                ? debts?.map((debt) => {
                    debtsTotalArr.push(+debt.amount);
                    return <Debt key={debt.id} {...debt} />;
                  })
                : debts
                    ?.filter((debt) => {
                      let transactionDate = debt.dueDate.slice(5, 7);
                      let selectedDateFormated = selectedDate.slice(5, 7);
                      return transactionDate === selectedDateFormated;
                    })
                    .map((debt) => {
                      debtsTotalArr.push(+debt.amount);
                      return <Debt key={debt.id} {...debt} />;
                    })}
            </ul>
          </div>
        </motion.div>
        {!lock && (
          <motion.div
            variants={contentVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
          >
            <Btn
              text={content?.btnText}
              symbol='+'
              clicked={() => dispatch(toggleAddDebtModal())}
            />
          </motion.div>
        )}
        <motion.div
          variants={iconVariants}
          initial='hidden'
          animate='visible'
          exit='hidden'
        >
          <Business className='debts__icon' />
        </motion.div>
      </div>
    </>
  );
};

export default Debts;
