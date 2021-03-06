import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Btn } from '../../components/UI';
import './Stock.scss';
import Item from './components/Item';
import { formatMoney } from '../../shared/utility';
import { english, spanish } from '../../languages';
import { toggleAddItemModal } from '../../store/actions/settingsActions';
import { Header } from '../../components';
import { StockIcon } from '../../assets/images';
import { DatePicker } from '../../components';
import { motion } from 'framer-motion';

const Stock = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const lock = useSelector((state) => state.firebase.profile.isAccountLocked);
  const finance = useSelector((state) => state.finance);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const language = useSelector((state) => state.settings.language);
  const [content, setContent] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [totalStock, setTotalStock] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  if (!auth.uid) history.push('/auth');

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.stock });
    } else if (language === 'spanish') {
      setContent({ ...spanish.stock });
    }
  }, [language]);

  function sum(total, num) {
    return total + num;
  }

  const stockTotalArr = [];
  useEffect(() => {
    setTotalStock(stockTotalArr.reduce(sum, 0));
    // eslint-disable-next-line
  });

  let stock = finance?.stock;
  if (searchTerm !== '') {
    stock = finance?.stock?.filter((item) => item.name.includes(searchTerm));
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
        duration: 0.6,
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
        // delay: 0.3,
        damping: 13,
      },
    },
  };

  return (
    <>
      <Header getSearchTerm={getSearchTerm} />
      <DatePicker getDate={getDate} selectedDate={selectedDate} />
      <div className='stock content'>
        <motion.div
          variants={contentVariants}
          initial='hidden'
          animate='visible'
          exit='hidden' //Even though it is not working. Due tu huge bug while logging in and out.
          className={isDarkMode ? 'stock__container dark' : 'stock__container'}
        >
          <div className='stock__container--title'>
            <p>{content.stock}</p>
            <small>{formatMoney(totalStock)}</small>
          </div>

          <div className='stock__container--content'>
            <div className='stock__container--subtitle'>
              {/* I had to set the subtitle here when making it responsive in tablets and mobile due to neccessity on scrolling  */}
              <p>{content.item}</p>
              <p>{content.quantity}</p>
              <p>{content.totalCost}</p>
              <p>{content.unitCost}</p>
              <p>{content.dueDate}</p>
            </div>
            <ul className='items'>
              {!selectedDate ||
              selectedDate === 'Show All' ||
              selectedDate === 'Mostrar Todo'
                ? stock?.map((item) => {
                    stockTotalArr.push(+item.totalCost);
                    return <Item {...item} key={item.id} />;
                  })
                : stock
                    ?.filter((item) => {
                      let transactionDate = item.dueDate.slice(5, 7);
                      let selectedDateFormated = selectedDate.slice(5, 7);
                      return transactionDate === selectedDateFormated;
                    })
                    .map((item) => {
                      stockTotalArr.push(+item.totalCost);
                      return <Item key={item.id} {...item} />;
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
              text={content.btnText}
              symbol='+'
              clicked={() => dispatch(toggleAddItemModal())}
            />
          </motion.div>
        )}
        <motion.div
          variants={iconVariants}
          initial='hidden'
          animate='visible'
          exit='hidden'
        >
          <StockIcon className='stock__icon' />
        </motion.div>
      </div>
    </>
  );
};

export default Stock;
