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

const Stock = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const lock = useSelector((state) => state.firebase.profile.isAccountLocked);
  const finance = useSelector((state) => state.finance);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const language = useSelector((state) => state.settings.language);
  const [content, setContent] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.stock });
    } else if (language === 'spanish') {
      setContent({ ...spanish.stock });
    }
  }, [language]);

  let totalStock = 0;
  for (let i = 0; i < finance.stock.length; i++) {
    totalStock += +finance.stock[i].totalCost;
  }

  if (!auth.uid) history.push('/auth');

  return (
    <>
      <Header />
      <div className='stock content'>
        <div
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
              {finance.stock.map((item) => (
                <Item {...item} key={item.id} />
              ))}
            </ul>
          </div>
        </div>
        {!lock && (
          <Btn
            text={content.btnText}
            symbol='+'
            clicked={() => dispatch(toggleAddItemModal())}
          />
        )}
        <StockIcon className='stock__icon' />
      </div>
    </>
  );
};

export default Stock;
