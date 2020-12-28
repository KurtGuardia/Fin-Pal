import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Btn } from '../../components/UI';
import './Stock.scss';
import Article from './components/Article';
import { formatMoney } from '../../shared/utility';
import { english, spanish } from '../../languages';
import { toggleAddItemModal } from '../../store/actions/settingsActions';

const Stock = () => {
  const auth = useSelector((state) => state.firebase.auth);
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
    <div className='stock content'>
      <div
        className={isDarkMode ? 'stock__container dark' : 'stock__container'}
      >
        <div className='stock__container--title'>
          <p>{content.stock}</p>
          <small>{formatMoney(totalStock)}</small>
        </div>
        <div className='stock__container--subtitle'>
          <p>{content.article}</p>
          <p>{content.quantity}</p>
          <p>{content.totalCost}</p>
          <p>{content.unitCost}</p>
          <p>{content.dueDate}</p>
        </div>
        <div className='stock__container--content'>
          {finance.stock.map((article) => (
            <Article {...article} key={article.id} />
          ))}
        </div>
      </div>
      <Btn
        text={content.btnText}
        symbol='+'
        clicked={() => dispatch(toggleAddItemModal())}
      />
    </div>
  );
};

export default Stock;
